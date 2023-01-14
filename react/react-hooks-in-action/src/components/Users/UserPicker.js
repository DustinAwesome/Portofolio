import data from "../../static.json";
import { useState } from "react";

export default function UserPicker () {
    const { users } = data;

    return (
      <select>
        {users.map((u) => (
          <option key={u.id} value={u.name}>{u.name}</option>
        ))}
      </select>
    );
  }