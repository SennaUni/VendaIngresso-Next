"use client";

import { selectSpotAction, unSelectSpotAction } from "@/actions";

export type SpotSeatProps = {
  eventId: string;
  spotId: string;
  spotLabel: string;
  selected: boolean;
  disabled: boolean;
};

const SpotSeat = ({
  eventId,
  spotId,
  spotLabel,
  selected,
  disabled,
}: SpotSeatProps) => {
  return (
    <div className="flex">
      <input
        type="checkbox"
        name="spots"
        id={`spot-${spotId}`}
        value={spotId}
        disabled={disabled}
        defaultChecked={selected}
        className="peer hidden"
        onChange={async (event) => {
          event.target.checked
            ? await selectSpotAction(eventId, spotId)
            : await unSelectSpotAction(spotId);
        }}
      />

      <label
        htmlFor={`spot-${spotId}`}
        className="
          m-1 h-6 w-6 py-1 cursor-pointer select-none rounded-full bg-[#00A96E]
          text-center text-[10px] text-black peer-checked:bg-[#7480FF]
          peer-disabled:cursor-default  peer-disabled:bg-[#A6ADBB]
        "
      >
        {spotLabel}
      </label>
    </div>
  );
};

export default SpotSeat;
