import "../Styles/Components/UpdateBanner.scss";

const UpdateBanner = ({ updateWaiting, refreshApp }) => {
  console.log(updateWaiting);
  if (!updateWaiting) return <div></div>;

  return (
    <div className="update-banner">
      <h4>A new version of Randos is ready!</h4>
      <h4>
        <a href="" onClick={refreshApp}>
          Click here
        </a>{" "}
        to install.
      </h4>
    </div>
  );
};

export default UpdateBanner;
