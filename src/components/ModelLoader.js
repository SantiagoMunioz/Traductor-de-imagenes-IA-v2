import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ImageContext from '../context/ImageContext';
import LanguageContext from '../context/LanguageContext';
import ModelContext from '../context/ModelContext';
import ThemeContext from '../context/ThemeContext';
import { TranslationMMT } from '../functions/TranslationMMT';
import '../styles/ModelLoader.css';
import { Play } from './Play';
import Translation from './Translation';

const d = document;

export const ModelLoader = () => {
  const {themeConfig} = useContext(ThemeContext);
  const {texts} = useContext(LanguageContext);
  const {imageInfo} = useContext(ImageContext);
  const {setModelOn} = useContext(ModelContext);

  //#region Variables
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const [model, setModel] = useState(null);
  const result = d.getElementById('result');
  const [prediction, setPrediction] = useState("");
  const [translation, setTranslation] = useState("");
  //#endregion Variables

  //#region Cargar Modelo
  useEffect(() => {
    let t = tf;
    const loadModel = async () => {
      console.log("Cargando modelo...");
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      setModelOn(true);
      console.log("Modelo cargado");
    };

    loadModel();
  }, []);
  //#endregion Cargar Modelo

  //#region Identificar Imágenes
  useEffect(() => {
    const canvas = canvasRef.current;
    const canvas2 = canvasRef2.current;
    var context = canvas.getContext("2d");

    context.canvas.getContext('2d', { willReadFrequently: true });

    const image = new Image();
    image.src = imageInfo;

    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      classifier();
    };

    //#region Función Resample Single
    /**
     * Hermite resize - fast image resize/resample using Hermite filter. 1 cpu version!
     * 
     * @param {HtmlElement} canvas
     * @param {int} width
     * @param {int} height
     * @param {boolean} resize_canvas if true, canvas will be resized. Optional.
     * Cambiado por RT, resize canvas ahora es donde se pone el chiqitillllllo
     */
    function resampleSingle(canvas, width, height, resize_canvas) {
      var width_source = canvas.width;
      var height_source = canvas.height;
      width = Math.round(width);
      height = Math.round(height);

      var ratio_w = width_source / width;
      var ratio_h = height_source / height;
      var ratio_w_half = Math.ceil(ratio_w / 2);
      var ratio_h_half = Math.ceil(ratio_h / 2);

      var ctx = canvas.getContext("2d", {willReadFrequently: true});
      var ctx2 = resize_canvas.getContext("2d", {willReadFrequently: true});
      var img = ctx.getImageData(0, 0, width_source, height_source);
      var img2 = ctx2.createImageData(width, height);
      var data = img.data;
      var data2 = img2.data;

      for (var j = 0; j < height; j++) {
        for (var i = 0; i < width; i++) {
          var x2 = (i + j * width) * 4;
          var weight = 0;
          var weights = 0;
          var weights_alpha = 0;
          var gx_r = 0;
          var gx_g = 0;
          var gx_b = 0;
          var gx_a = 0;
          var center_y = (j + 0.5) * ratio_h;
          var yy_start = Math.floor(j * ratio_h);
          var yy_stop = Math.ceil((j + 1) * ratio_h);
          for (var yy = yy_start; yy < yy_stop; yy++) {
            var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
            var center_x = (i + 0.5) * ratio_w;
            var w0 = dy * dy; //pre-calc part of w
            var xx_start = Math.floor(i * ratio_w);
            var xx_stop = Math.ceil((i + 1) * ratio_w);
            for (var xx = xx_start; xx < xx_stop; xx++) {
              var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
              var w = Math.sqrt(w0 + dx * dx);
              if (w >= 1) {//pixel too far
                continue;
              }//hermite filter
              weight = 2 * w * w * w - 3 * w * w + 1;
              var pos_x = 4 * (xx + yy * width_source);
              //alpha
              gx_a += weight * data[pos_x + 3];
              weights_alpha += weight;
              //colors
              if (data[pos_x + 3] < 255)
                weight = weight * data[pos_x + 3] / 250;
                gx_r += weight * data[pos_x];
                gx_g += weight * data[pos_x + 1];
                gx_b += weight * data[pos_x + 2];
                weights += weight;
            }
          }
          data2[x2] = gx_r / weights;
          data2[x2 + 1] = gx_g / weights;
          data2[x2 + 2] = gx_b / weights;
          data2[x2 + 3] = gx_a / weights_alpha;
        }
      }
      ctx2.putImageData(img2, 0, 0);
    }
    //#endregion Función Resample Single

    function classifier() {
      if (imageInfo) {
        resampleSingle(canvas, 100, 100, canvas2);

        var context2 = canvas2.getContext('2d', { willReadFrequently: true });
        context2.canvas.getContext('2d', { willReadFrequently: true });
        context.canvas.getContext('2d', { willReadFrequently: true });
        var imgData = context2.getImageData(0, 0, 100, 100);

        try {
          model.classify(imgData).then(predictions => {
            console.log('prediccion: ', predictions[0].className);
            if(predictions[0].className === "sorrel"){
              result.innerHTML = ("horse");
              setPrediction("caballo (horse)");
            }
            else if(predictions[0].className === "coffee mug"){
              result.innerHTML = ("coffee cup");
              setPrediction("coffee cup");
            }
            else{
              result.innerHTML = (predictions[0].className);
              setPrediction(predictions[0].className);
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [imageInfo]);
  //#endregion Identificar Imágenes
  
  useEffect(()=>{
    function translateMMT(){
      if(prediction !== null && prediction !== undefined && prediction !== ""){
        TranslationMMT(prediction, "en|es").then((translatedText) => {
            const jsonResponse = JSON.parse(translatedText);
            setTranslation(jsonResponse.responseData.translatedText);
        }).catch((error) => {
            console.error('Error al traducir', error);
        });
      }
    }

    translateMMT();
  },[prediction]);
  
  return (
    <div
      className='modelCont'
      style={{
        color: themeConfig.color,
        backgroundColor: themeConfig.backgroundElement,
        borderColor: themeConfig.border
      }}
    >
      {model ? null : 
        <>
          <h1 className='aviso'>Cargando...</h1>
        </>
      }
      <h2 className='titleResult'>{texts.rTitle}</h2>
      <div className="secRst">
        <h2 id='result' className='rslt'>{texts.mRslt}</h2>
        <hr style={{backgroundColor: themeConfig.border}}/>
        <Play speaking={prediction}/>
        {translation ? <h2 id='result1' className='rslt'>{translation}</h2> : <Translation word={prediction}/>}
      </div>
      <div className="rSCont">
        <canvas className='rSCanv' ref={canvasRef}></canvas>
        <canvas className='rSCanvS' ref={canvasRef2}></canvas>
      </div>
    </div>
  );
}