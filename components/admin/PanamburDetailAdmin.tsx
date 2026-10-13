"use client";

import React from "react";
import { PlacesData } from "@/lib/cms";
import PlaceDetailAdmin from "@/components/admin/PlaceDetailAdmin";

interface PanamburDetailAdminProps {
  data: PlacesData;
  onChange: (updated: PlacesData) => void;
}

export default function PanamburDetailAdmin({
  data,
  onChange,
}: PanamburDetailAdminProps) {
  return (
    <PlaceDetailAdmin
      data={data}
      onChange={onChange}
      selectedSlug="panambur-beach"
    />
  );
}
