import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startUploading } from "../../actions/images";
import Spinner from "../Stateless/Spinner";

const Images = ({ action }) => {
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.images);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
      e.target.value = "";
    }
  };
  const handlePictureUpload = () => {
    document.querySelector("#fileSelector").click();
  };

  return (
    <>
      <div className="journal__images-container">
        <div className="journal__card">
          <div className="journal__card-body" onClick={handlePictureUpload}>
            <input
              type="file"
              name="file"
              id="fileSelector"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <i className="fas fa-plus"></i>
            <p>Agregar una imagen</p>
          </div>
        </div>
        {content ? (
          <>
            {content.map((url, i) => (
              <div
                className="journal__card"
                key={i}
                onClick={() => action(url)}
              >
                <div
                  className="journal__card-body"
                  style={{ backgroundImage: `url(${url})` }}
                ></div>
              </div>
            ))}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Images;
