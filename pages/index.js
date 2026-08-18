import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
// const DUMMY_DATA = [
//   {
//     id: "m1",
//     title: "first meetup",
//     image:
//       "https://tse1.mm.bing.net/th/id/OIP.3-Mfh9Cfq9gb9uAWE3IJxwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
//     address: "a first meetup address",
//     description: "first description",
//   },
//   {
//     id: "m2",
//     title: "first meetup",
//     image:
//       "https://tse1.mm.bing.net/th/id/OIP.3-Mfh9Cfq9gb9uAWE3IJxwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
//     address: "a first meetup address",
//     description: "first description",
//   },
//   {
//     id: "m3",
//     title: "first meetup",
//     image:
//       "https://tse1.mm.bing.net/th/id/OIP.3-Mfh9Cfq9gb9uAWE3IJxwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
//     address: "a first meetup address",
//     description: "first description",
//   },
// ];
export default function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://ebrahimmatter991_db_user:Qy8yKQ3IN9El4kXV@cluster0.b4apxn3.mongodb.net/?appName=Cluster0",
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
