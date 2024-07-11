export interface FormField {
  label: string;
  type: string;
  options?: string[];
  min?: number;
  max?: number;
  name: string;
}

export const AuthenticationSettings = [
  { label: "Password", type: "password", name: "password" },
  { label: "Confirm Password", type: "password", name: "confiram_password" },
];

export const DeviceConfiguration = [
  { label: "Level Indication", type: "text", name: "level_indication" },
  {
    label: "Network Selection",
    type: "select",
    options: ["3P4W", "1P2W"],
    name: "network_selection",
  },
];
export const CurrentTransformerSettings = [
  {
    label: "CT Secondary",
    type: "select",
    options: ["5A", "10A"],
    name: "ct_secondary",
  },
  {
    label: "CT Primary",
    type: "number",
    min: 1,
    max: 100,
    name: "ct_primary",
  },
];
export const PotentialTransformerSettings = [
  { label: "PT Secondary", type: "number", name: "pt_secondary" },
  { label: "PT Primary", type: "number", name: "pt_primary" },
];
export const CompensationSettings = [
  {
    label: "Phase Compensation Angle",
    type: "number",
    name: "phase_coompansation_angle",
  },
  { label: "Nominal Voltage", type: "text", name: "npminal_voltage" },
  { label: "Threshold Voltage", type: "number", name: "threshold_voltage" },
  {
    label: "Auto Initialization",
    type: "radio",
    options: ["Yes", "No"],
    name: "auto_initialization",
  },
  { label: "Relays Count", type: "number", name: "relays_count" },
  {
    label: "Control Mode",
    type: "radio",
    options: ["Auto", "Manul"],
    name: "control_mode",
  },
  {
    label: "Switching program",
    type: "radio",
    options: ["Auto", "Linear", "Rational"],
    name: "switching_program",
  },
  { label: "Target Power Factor", type: "number", name: "relays_count" },
];
export const TimingSettings = [
  { label: "Step Time", type: "number", name: "step_time" },
  {
    label: "Discharge Time(Reconnection Time)",
    type: "number",
    name: "discharge_time",
  },
];
export const ControlSensitivitySettings = [
  {
    label: "Control Sensitivity",
    type: "number",
    name: "control_sensitivity",
  },
  { label: "Low Current", type: "number", name: "low_current" },
];
export const CommunicationSettings = [
  { label: "Slave ID", type: "number", name: "slava_id" },
  {
    label: "Baud Rate",
    type: "select",
    options: ["9600", "14400", "19200"],
    name: "baud_rate",
  },
  {
    label: "Parity",
    type: "radio",
    options: ["None", "Odd", "Even"],
    name: "parity",
  },
  {
    label: "Stop Bits",
    type: "radio",
    options: ["1", "2"],
    name: "stop_bits",
  },
];
export const DisplaySettings = [
  { label: "Back Light", type: "number", name: "back_light" },
];

export type Setting = {
  name: string;
  label: string;
  type: "switch" | "input" | "select" | "password";
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
  step?: number;
};

export const voltageSettings: Setting[] = [
  { name: "trip_time", label: "TRIP TIME", type: "switch" },
  { name: "no_volt", label: "NO VOLT", type: "switch" },
  { name: "over_volt", label: "OVER VOLT", type: "switch" },
  {
    name: "over_volt_min",
    label: "Set Over Voltage Min",
    type: "input",
    min: 0,
    max: 1000,
    unit: "V",
  },
  {
    name: "over_volt_max",
    label: "Set Over Voltage Max",
    type: "input",
    min: 0,
    max: 1000,
    unit: "V",
  },
  { name: "under_volt", label: "UNDR VOLT", type: "switch" },
];

export const harmonicDistortionSettings: Setting[] = [
  {
    name: "total_harmonic_distortion",
    label: "Total Harmonic Distortion",
    type: "switch",
  },
  {
    name: "thd_range",
    label: "THD I Range",
    type: "input",
    min: 0,
    max: 100,
    unit: "%",
  },
];

export const compensationSettings: Setting[] = [
  { name: "over_compensate", label: "Over Compensate", type: "switch" },
  { name: "under_compensate", label: "Under Compensate", type: "switch" },
];

export const errorHandlingSettings: Setting[] = [
  { name: "step_error", label: "Step Error", type: "switch" },
  {
    name: "step_error_setting",
    label: "Step Error Setting",
    type: "input",
    min: 0,
    max: 100,
    unit: "%",
  },
  { name: "ct_polarity_error", label: "CT Polarity error", type: "switch" },
  { name: "over_temperature", label: "Over Temperature", type: "switch" },
  {
    name: "over_temperature_setting",
    label: "Over Temperature Setting",
    type: "input",
    min: 0,
    max: 100,
    unit: "C",
  },
];

export const fanAndHysteresisSettings: Setting[] = [
  { name: "fan_setting", label: "Fan Setting", type: "switch" },
  {
    name: "hysteresis_voltage",
    label: "Hysteresis Voltage",
    type: "input",
    min: 0,
    max: 100,
    unit: "%",
  },
  {
    name: "hysteresis_pf",
    label: "Hysteresis PF",
    type: "input",
    min: 0,
    max: 100,
    unit: "%",
  },
];

export const factoryAndEnergySettings: Setting[] = [
  { name: "factory_default", label: "Factory Default", type: "switch" },
  { name: "reset_energy", label: "Reset Energy", type: "switch" },
  {
    name: "reset_energy_password",
    label: "Reset Energy Password",
    type: "password",
  },
  { name: "reset_kwh", label: "Reset kWh", type: "switch" },
  { name: "reset_kvah", label: "Reset kVAh", type: "switch" },
  { name: "reset_kvarh", label: "Reset kVARh", type: "switch" },
];

export const factoryEnergySettings: any = [
  ...Array.from({ length: 14 }, (_, i) => ({
    label: `RLY${i + 1}`,
    type: "switch",
    name: `rly${i + 1}`,
  })),
];
export const steppersConstansts = [
  { title: "Level1", sub_title: "Short step description" },
  { title: "Level2", sub_title: "Short step description" },
  { title: "Level3", sub_title: "Short step description" },
  { title: "Level4", sub_title: "Short step description" },
];
