import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const PROJECT = gql`
  query GetProjects($id: ID!) {
    project(id: $id) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(PROJECT, { variables: { id: id } });
  console.log(data);
  return <div>Project</div>;
}
