import Card from "react-bootstrap/Card";

const Quote = (props) => {
  return (
    <Card className="text-center">
      {/* <Card.Header>Quote</Card.Header> */}
      <Card.Body>
        <figure className="mb-0">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
          <figcaption className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>
      </Card.Body>
    </Card>
  );
};

export default Quote;
