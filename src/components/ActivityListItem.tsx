import React from "react";
import IActivityListItemProps from "../interfaces/IActivityListItemProps";


export default function ActivityListItem(props: IActivityListItemProps) {
    return (
        <li>
            <h4>{props.activity.name}</h4>  
            <p>{props.activity.duration} minutes</p>
            {props.activity.createdAt &&
                <p>{new Date(props.activity.createdAt).toString()}</p>
            }                                                  
        </li>
    )
}