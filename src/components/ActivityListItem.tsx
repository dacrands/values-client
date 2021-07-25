import React from "react";
import { Link } from "react-router-dom";
import IActivityListItemProps from "../interfaces/IActivityListItemProps";

export default function ActivityListItem(props: IActivityListItemProps) {
  return (
    <li className="card">
      <Link to={`/activities/${props.activity._id}/${props.activity.name}`}>
        <h4>{props.activity.name}</h4>
        <p>{props.activity.duration} minutes</p>
        {props.activity.createdAt && (
          <p>{new Date(props.activity.createdAt).toLocaleString()}</p>
        )}
      </Link>
    </li>
  );
}
