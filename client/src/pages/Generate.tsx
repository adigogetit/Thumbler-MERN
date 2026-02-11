import { useState } from "react";
import { useParams } from "react-router-dom"
import { IThumbnail } from "../assets/assets";
import SoftBackdrop from "../components/SoftBackDrop";

const Generate = () => {

  const id = { useParams };
  const [title, setTitle] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <SoftBackdrop />
      <div>

      </div>

    </>
  )
}

export default Generate
