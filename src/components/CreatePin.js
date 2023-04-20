import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import { categories } from "../utils/data";
import Spinner from "./Spinner";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState("");
  const [imageAsset, setImageAsset] = useState("");
  const [wrongImage, setWrongImage] = useState("");

  const uploadImage = (e) => {
    // console.log(e.target.files);

    const { type, name } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/gif" ||
      type === "image/tiff" ||
      type === "image/jpeg"
    ) {
      setWrongImage(false);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Image Upload Error", error);
        });
    } else {
      setWrongImage(true);
      setLoading(false);
    }
  };


  // console.log(imageAsset?._id,'create-pin')
  // console.log(user?.user?._id)
  const navigate = useNavigate();

  const savePin = () =>{
    if(title && about && destination && imageAsset?._id && category ){
      const doc= {
        _type:'pin',
        title,
        about,
        destination,
        image:{
          _type:'image',
          asset:{
            _type:'reference',
            _ref:imageAsset?._id
          }
        },
        userId:user?.user?._id,
        postedBy: {
          _type:'postedBy',
          _ref: user?.user._id
        },
        category,
      }

      client.create(doc)
      .then(()=>{
        navigate('/')
      })
    }
    else{
      setFields(true);
      setTimeout(()=>{setFields(false)},2000)
    }
  }

  // console.log(user);
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-500  ease-in">
          Please fill in all the fields{" "}
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.5 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotten border-gray-300 p-3 w-full h-420">
            {loading && <Spinner m={`Loading`} />}
            {wrongImage && <p>Wrong Image type</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center hover:cursor-pointer items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg"> Click To Upload </p>
                  </div>
                  <p className=" text-sm mt-32 text-gray-400">
                    Recommendation: Use High-Quality JPG, PNG, GIF or TIFF less
                    than 20 MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="Upload Image"
                  className="h-full w-full"
                />

                <button
                  type="button"
                  className=" w-8 h-8 flex justify-center opacity-70 hover:opacity-100 items-center absolute bottom-3 right-3 rounded-full text-xl bg-white cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => {
                    setImageAsset(null);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Add Your Title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />

          {user != null && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
              <img
                src={user?.user?.imageUrl}
                className="w-10 h-10 rounded-full"
                alt="user-image"
              />
              <p className="font-bold">{user?.user?.userName}</p>
            </div>
          )}

          <input
            type="text"
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            placeholder="What is Your Pin About"
            className="outline-none text-base sm:text-large border-b-2 border-gray-200 p-2"
          />

          <input
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
            placeholder="Add A Destination Link"
            className="outline-none text-base sm:text-large border-b-2 border-gray-200 p-2"
          />

          <div className="flex flex-col ">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl">
                Choose Pin Category
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none  w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other" className="bg-white ">
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black"
                    value={cat?.name}
                    key={cat?.name}
                  >
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div
            className="flex justify-end items-end mt-5 "
            >
              <button
              type='button'
              onClick={savePin}
              className='bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'
              >
                Save Pin
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
