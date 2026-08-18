import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
export default function MeetupDetails(props) {
  return (
    <MeetupDetail
      title={props.meetupData.title}
      description={props.meetupData.description}
      image={props.meetupData.image}
      address={props.meetupData.address}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://ebrahimmatter991_db_user:Qy8yKQ3IN9El4kXV@cluster0.b4apxn3.mongodb.net/?appName=Cluster0",
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupsId = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();
  return {
    fallback: "blocking",
    paths: meetupsId.map((meetup) => ({
      params: {
        meetupid: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupid;
  const client = await MongoClient.connect(
    "mongodb+srv://ebrahimmatter991_db_user:Qy8yKQ3IN9El4kXV@cluster0.b4apxn3.mongodb.net/?appName=Cluster0",
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,

        title: selectedMeetup.title,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
      },
    },
    revalidate: 1,
  };
}
