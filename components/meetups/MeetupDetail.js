import classes from "./MeetupDetail.module.css";
export default function MeetupDetail({ title, address, description, image }) {
  return (
    <section className={classes.details}>
      <img src={image} alt={title}></img>
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
}
