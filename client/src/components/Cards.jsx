import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PsychologyIcon from "@mui/icons-material/Psychology";
import BookLibrary from "../assets/book-library.jpg";
import NoteBook from "../assets/notebook.jpg";
import WebThoughts from "../assets/web-of-thoughts.jpg";

const Cards = () => {
  return (
    <div className="container px-4 py-5" id="custom-cards">
      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        <div className="col">
          <div
            className="position-relative card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
            style={{
              backgroundImage: `url(${BookLibrary})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            />
            <div className="position-relative d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
              <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                Your book search powered by OpenLibrary
              </h3>
              <ul className="d-flex list-unstyled mt-auto">
                <li className="me-auto">
                  {/* <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Open_Library_tight_logo.svg/512px-Open_Library_tight_logo.svg.png"
                      alt="Open Library"
                      width="50"
                      height="50"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.58)",
                        padding: "6px",
                        borderRadius: "15px",
                        boxShadow: "0 2px 8px rgba(255, 255, 255, 0.35)",
                      }}
                    /> */}
                  <ImportContactsIcon style={{ fontSize: "42px" }} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col">
          <div
            className="position-relative card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
            style={{
              backgroundImage: `url(${NoteBook})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            />
            <div className="position-relative d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
              <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                Make book notes as you read
              </h3>
              <ul className="d-flex list-unstyled mt-auto">
                <li className="me-auto">
                  {/* <img
                      src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
                      alt="Open Library"
                      width="50"
                      height="50"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.58)",
                        padding: "6px",
                        borderRadius: "15px",
                        boxShadow: "0 2px 8px rgba(255, 255, 255, 0.35)",
                      }}
                    /> */}
                  <NoteAddIcon style={{ fontSize: "42px" }} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col">
          <div
            className="position-relative card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
            style={{
              backgroundImage: `url(${WebThoughts})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            />
            <div className="position-relative d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
              <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                Make borrowed thoughts your own and share it
              </h3>
              <ul className="d-flex list-unstyled mt-auto">
                <li className="me-auto">
                  {/* <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Open_Library_tight_logo.svg/512px-Open_Library_tight_logo.svg.png"
                      alt="Open Library"
                      width="50"
                      height="50"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.58)",
                        padding: "6px",
                        borderRadius: "15px",
                        boxShadow: "0 2px 8px rgba(255, 255, 255, 0.35)",
                      }}
                    /> */}

                  <PsychologyIcon style={{ fontSize: "45px" }} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
