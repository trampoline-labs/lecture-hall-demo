import { AdminHeader } from "../../components/header";
import NewHallForm from "../../components/new-hall-form";

export default function NewHall() {
  return (
    <div className="w-full px-2">
      <AdminHeader heading="New Hall" text="Create a new Lecture hall entry" />
      <div>
        <NewHallForm />
      </div>
    </div>
  );
}
