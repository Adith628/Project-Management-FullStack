import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";

type Props = {};

const UrgentPage = (props: Props) => {
  return <ReusablePriorityPage priority={Priority.Medium} />; // Assuming "Urgent" is a valid Priority enum value
};

export default UrgentPage;
