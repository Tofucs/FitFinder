import React from "react"

function checkSize(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    const image = event.currentTarget;
  
    // Add max width class by default
    image.classList.add("pin_max_width");
  
    const imageRect = image.getBoundingClientRect();
    const parent = image.parentElement;
  
    if (parent) {
      const parentRect = parent.getBoundingClientRect();
  
      const isImageTooSmall =
        imageRect.width < parentRect.width || imageRect.height < parentRect.height;
  
      if (isImageTooSmall) {
        image.classList.remove("pin_max_width");
        image.classList.add("pin_max_height");
      }
    }
  
    image.style.opacity = "1";
  }
  

const Pin = (props) => {
    return (
        <div>
            <input type="file" name="picture" id="picture"> </input>

            <div className="card">
                <div className="outfit-title"></div>

                <div className="outfit-modal">
                    <div className="modal-header">
                    </div>

                    <div className="modal-footer">
                        <div className="icon-contianer">
                            <img className="like-button"/> 
                        </div>
                    </div>
                </div>


                <div className="pin_image">
                    <img onLoad={checkSize} src={props.pinDetails.img_blob} alt="pin_image" />
                </div>
            </div>
        </div>
    )
}

export default Pin