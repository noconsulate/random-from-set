import "../Styles/Components/UpdateBanner.scss";

const UpdateBanner = ({ updateWaiting, refreshApp }) => {
  console.log(updateWaiting);
  if (!updateWaiting)
    return (
      <div>
        <p>no update</p>
      </div>
    );

  return (
    <div className="updateReady">
      <h4>A new version of Randos is ready!</h4>
      <h4>
        <a onClick={refreshApp}>Click here</a> to install.
      </h4>
    </div>
  );
};

export default UpdateBanner;
