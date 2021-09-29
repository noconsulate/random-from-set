import "../Styles/Components/Root.scss";

const root = () => {
  return (
    <div className="container">
      <p>
        Welcome to <em>Randos</em>.
      </p>
      <p>
        Click <em>new</em> on the toolbar to start a new set.
      </p>
      <p>
        Eeach set has a unique key. You can enter the key in the toolbar or put
        it after the "/" in the url. Anyone with this key can view and edit the
        set. Either bookmark the page when you're at your set or write down the
        key somewhere.
      </p>
      <p>
        Made by <a href="mailto:janssenkuhn@mailbox.org">Janssen Kuhn</a>
      </p>
      <p>
        Visit the{" "}
        <a
          href="https://github.com/noconsulate/random-from-set"
          target="_blank"
        >
          repository
        </a>
        .
      </p>
    </div>
  );
};

export default root;
