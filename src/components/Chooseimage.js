import React, { useRef, useState, useEffect } from 'react';
import Carousal from './Carousal';

// import Button from "../Button/index";

const Chooseimage = props => {
  console.log(props);
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  const filePickerRef = useRef();

  // useEffect(() => {
  //   if (!file) {
  //     return;
  //   }
  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     setPreviewUrl(fileReader.result);
  //   };
  //   fileReader.readAsDataURL(file[0]);
  // }, [file]);

  const checkDimensions = pickedFile => {
    return new Promise((resolve, reject) => {
      let imageFile;
      var _URL = window.URL || window.webkitURL;
      let imgWidth = 0,
        imgHeight = 0;
      let { minWidth, minHeight } = props.size;
      // let minHeight = 493;

      imageFile = new Image();
      imageFile.src = _URL.createObjectURL(pickedFile);
      imageFile.onload = function() {
        console.log('calculating');
        imgWidth = this.width;
        imgHeight = this.height;
        console.log(imgWidth, imgHeight);
        // resolve({ imgWidth, imgHeight });
        //   resolve({ imgWidth, imgHeight });
        if (imgWidth > minWidth && imgHeight > minHeight) {
          resolve(true);
        } else {
          console.log('i am running');
          resolve(false);
        }
      };
    });
  };

  const pickedImage = async evt => {
    let pickedFile;
    let fileIsValid = isValid;

    if (evt.target.files && evt.target.files.length === 1) {
      pickedFile = evt.target.files;
      console.log(pickedFile);

      let res = await checkDimensions(pickedFile[0]);
      console.log(res);

      if (res === true) {
        console.log('image is right');
      } else {
        props.selectedImages({ img: [], success: false, name: props.name });
        return;
      }

      // setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      // fileIsValid(false);
    }

    let images = [];
    const base64 = file => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          images.push(fileReader.result);
          resolve(images);
        };
        fileReader.onerror = error => {
          reject(error);
        };
      });
    };

    let i = 0;
    for (const property in pickedFile) {
      if (i < pickedFile.length) {
        const image = await base64(pickedFile[i]);
      }

      i = i + 1;
    }
    setFile(images);
    console.log(images);
    props.selectedImages({ img: images, success: true, name: props.name });

    // props.onInput(props.id, images);
  };

  const pickImageHandler = evt => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <input
        id={props.id}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg , .png , .jpeg"
        ref={filePickerRef}
        onChange={pickedImage}
        // multiple
      />
      <div>
        <div>
          <button
            onClick={pickImageHandler}
            className="btn btn-sm btn-warning mt-2 "
          >
            <i class="fas fa-camera-retro px-2"></i>Choose Image
          </button>
          {/* <Button type="button" text="Choose Image" >
            Choose Images
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Chooseimage;
