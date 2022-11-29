import React from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const UploadImage = ({ imageFiles, setImageFiles }) => {
  // const [imageFiles, setImageFiles] = useState([]);

  const handleFileInput = (e) => {
    if (imageFiles.length >= 4) return;
    const filesList = e.target.files;
    if (filesList.length > 4) return;
    const list = [];

    for (let i = 0; i < filesList.length; i++) {
      const url = URL.createObjectURL(filesList[i]);
      list.push({ file: filesList[i], url: url });
    }
    setImageFiles([...imageFiles, ...list]);
  };
  console.log(
    '🚀 ~ file: UploadImage.js ~ line 10 ~ handleFileInput ~ imageFiles',
    imageFiles
  );
  const handleDeleteImage = (item) => {
    let listImage = [];
    listImage = imageFiles.filter(
      (image) => image.file.name !== item.file.name
    );
    setImageFiles(listImage);
  };

  return (
    <div className="w-full h-full p-4 border border-slate-300 shadow-md">
      {!imageFiles.length > 0 ? (
        <label
          htmlFor="uploadImage"
          className="w-full h-full cursor-pointer inline-block"
        >
          <div className="w-full h-full flex items-center justify-center">
            <MdAddAPhoto className="w-10 h-10" />
          </div>
          <input
            onChange={(e) => handleFileInput(e)}
            type="file"
            id="uploadImage"
            className="hidden"
            multiple={true}
            accept={'image/png, image/jpeg, image/jpg, image/bmp'}
          />
        </label>
      ) : (
        <div className="w-full h-full grid grid-cols-2 gap-1">
          {imageFiles.map((item) => {
            return (
              <div
                key={item.url}
                className="w-full h-[180px] cursor-pointer relative"
              >
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <AiOutlineCloseCircle
                  className="absolute right-1 top-1 text-3xl text-primary"
                  onClick={() => handleDeleteImage(item)}
                />
              </div>
            );
          })}
          {imageFiles.length < 4 && imageFiles.length > 0 && (
            <div className="w-full h-[180px]">
              <label
                htmlFor="uploadImage"
                className="w-full h-full cursor-pointer inline-block"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <MdAddAPhoto className="w-10 h-10" />
                </div>
                <input
                  onChange={(e) => handleFileInput(e)}
                  type="file"
                  id="uploadImage"
                  className="hidden"
                  multiple={true}
                  accept={'image/png, image/jpeg, image/jpg, image/bmp'}
                />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
