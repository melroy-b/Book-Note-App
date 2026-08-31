import Card from "react-bootstrap/Card";
import useGetQuotes from "../hooks/useGetQuotes";

const fallbackQuote = {
  quote: "Reading is a conversation. All books talk. But a good book listens as well.",
  author: "Mark Haddon",
  source: "",
};

/**
 * Renders a simple quote section for the home page.
 */
const Quote = () => {
  const { quote, loading, error } = useGetQuotes();
  const displayQuote = quote?.quote ? quote : fallbackQuote;

  return (
    <Card className="text-center" aria-busy={loading}>
      {/* <Card.Header>Quote</Card.Header> */}
      <Card.Body>
        <figure className="mb-0">
          <p>
            {loading ? "Finding a quote..." : displayQuote.quote}
          </p>
          <figcaption className="blockquote-footer">
            {loading ? (
              "Please wait"
            ) : (
              <>
                {displayQuote.author || "Unknown"}
                {displayQuote.source ? (
                  <>
                    {" "}
                    in <cite title={displayQuote.source}>{displayQuote.source}</cite>
                  </>
                ) : null}
              </>
            )}
          </figcaption>
        </figure>
        {error ? (
          <p className="text-danger small mt-2 mb-0">
            Unable to load a fresh quote.
          </p>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default Quote;
