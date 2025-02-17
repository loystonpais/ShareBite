"use client";
import { Capacitor } from "@capacitor/core";
import { Camera, CameraResultType } from "@capacitor/camera";

export default async function upload() {
    const isAvailable = Capacitor.isPluginAvailable('Camera');

    if (!isAvailable) {
      
    } else {
      // Otherwise, make the call:
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
      });
    }
}

export const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    let imageUrl = image.webPath;
  
}

