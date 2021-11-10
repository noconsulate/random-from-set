import "../Styles/Components/UpdateBanner.scss";

const UpdateBanner = ({ updateWaiting, refreshApp }) => {
  if (!updateWaiting) return <div></div>;

  return (
    <div className="update-banner">
      <h4>A new version of Randos is ready!</h4>
      <h4>
        <button onClick={refreshApp}>Click here to install.</button>
      </h4>
    </div>
  );
};

export default UpdateBanner;
