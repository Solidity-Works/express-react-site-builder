/**
 * Adds loadHtmltemplate command
 */
import axios from "axios";
import React, { useState } from "react";
import { addWidget, updateWidget, getWidgets, getWidgetData } from "./actions";
import { loadHtmltemplate } from "./consts";
import JSZip from "jszip";
import fs from "fs";
import path from "path";

export default (editor, config) => {
  const cm = editor.Commands;

  cm.add(loadHtmltemplate, (e) => {
    const pHtml = e.getModel().get("Parser").parserHtml;
    // JSX expression in attributes are quoted, so unquote them before passing on
    let html = pHtml.unquoteJsxExpresionsInAttributes(e.getHtml());
    config.setHtmlString(html);
    config.setCssString(e.getCss());
  });
  cm.add("save-db", {
    run: function (editor, sender) {

      const loadAllFiles = () => {
        return ["./src/Chart/components.jsx"];
      };

      const createZipFile = async () => {
        // const zip = new JSZip();

        // const fileURLs = loadAllFiles();
    
        // fileURLs.forEach(fileURL => {
        //   const reader = () => {
        //     return new Promise((resolve, reject) => {
        //         const file = new File(fileURL);
        //         const fileReader = new FileReader();
        //         fileReader.onload = () => resolve(fileReader.result);
        //         fileReader.readAsDataURL(file)
        //     });
        //   }
        //   const readFile = () => {
        //       reader().then(result => console.log(result));
        //       // zip.file(file.name, file);
        //   }
        //   readFile();
        // });
    
        // const blob = new Blob([zip.generateAsync({ type: "blob" }).then(content => content)], { type: "application/zip" });
    
        // const link = document.createElement("a");
        // link.href = window.URL.createObjectURL(blob);
        // link.download = "my-file.zip";
        // link.click();
      };

      createZipFile();
      
      sender && sender.set("active");
      editor.store();
    },
  });
};
