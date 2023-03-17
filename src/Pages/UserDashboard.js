import React from "react";
import UseHealmet from "../Hooks/UseHealmet";
import { GiCardboardBoxClosed } from "react-icons/gi";
function UserDashboard() {
  return (
    <div>
      <UseHealmet title={"User Dashboard"} />
      <div>
        <div className="grid gap-4 grid-cols-3">
          <div class="relative block rounded-sm cursor-pointer p-4 custom_box sm:p-6 lg:p-8">
            <div class="flex items-center gap-4">
              <GiCardboardBoxClosed size={40} />

              <h3 class="text-3xl font-bold sm:text-4xl">100+</h3>
            </div>

            <p class="mt-4 font-medium text-gray-500">Total Order</p>
          </div>
          <div class="relative block rounded-sm cursor-pointer p-4 custom_box sm:p-6 lg:p-8">
            <div class="flex items-center gap-4">
              <GiCardboardBoxClosed size={40} />

              <h3 class="text-3xl font-bold sm:text-4xl">100+</h3>
            </div>

            <p class="mt-4 font-medium text-gray-500">Total Order</p>
          </div>
          <div class="relative block rounded-sm cursor-pointer p-4 custom_box sm:p-6 lg:p-8">
            <div class="flex items-center gap-4">
              <GiCardboardBoxClosed size={40} />

              <h3 class="text-3xl font-bold sm:text-4xl">100+</h3>
            </div>

            <p class="mt-4 font-medium text-gray-500">Total Order</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
