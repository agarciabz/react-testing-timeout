import { useEffect, useState } from "react";

interface Props {
  hasDialog: boolean;
}

const Loader = ({ hasDialog }: Props) => {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    let timeout: number;
    if (hasDialog) {
      timeout = handleTimeout();
    }
    return () => {
      window.clearTimeout(timeout);
    };
  }, [hasDialog]);

  const handleTimeout = (duration = 1000) => {
    console.log("inside handleTimeout");
    return window.setTimeout(() => {
      console.log("inside setTimeout");
      setShowDialog(true);
    }, duration);
  };

  useEffect(() => {
    console.log("showDialog", showDialog);
  }, [showDialog]);

  const handleWait = () => {
    window.clearTimeout(handleTimeout());
    setShowDialog(false);
    handleTimeout(3000);
  };

  const handleLeave = () => {
    window.clearTimeout(handleTimeout());
    setShowDialog(false);
  };

  return (
    <div>
      <h1>Loading...</h1>
      {hasDialog && showDialog && (
        <div>
          <p>Are you still there?</p>
          <button onClick={handleWait}>Keep waiting</button>
          <button onClick={handleLeave}>Leave</button>
        </div>
      )}
    </div>
  );
};

export default Loader;
