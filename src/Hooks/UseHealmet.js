import React from "react";
import { Helmet } from "react-helmet-async";

export default function UseHealmet({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
