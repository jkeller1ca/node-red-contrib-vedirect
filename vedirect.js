/** 
 * Victron VE.Direct Parser for Node-Red.
 *
 * 
 */


const productIDTable = {
    "0x0203": "BMV-700",
    "0x0204": "BMV-702",
    "0x0205": "BMV-700H",
    "0x0300": "BlueSolar MPPT 70|15",
    "0xA040": "BlueSolar MPPT 75|50",
    "0xA041": "BlueSolar MPPT 150|35",
    "0xA042": "BlueSolar MPPT 75|15",
    "0xA043": "BlueSolar MPPT 100|15",
    "0xA044": "BlueSolar MPPT 100|30",
    "0xA045": "BlueSolar MPPT 100|50",
    "0xA046": "BlueSolar MPPT 150|70",
    "0xA047": "BlueSolar MPPT 150|100",
    "0xA049": "BlueSolar MPPT 100|50 rev2",
    "0xA04A": "BlueSolar MPPT 100|30 rev2",
    "0xA04B": "BlueSolar MPPT 150|35 rev2",
    "0xA04C": "BlueSolar MPPT 75|10",
    "0xA04D": "BlueSolar MPPT 150|45",
    "0xA04E": "BlueSolar MPPT 150|60",
    "0xA04F": "BlueSolar MPPT 150|85",
    "0xA050": "SmartSolar MPPT 250|100",
    "0xA051": "SmartSolar MPPT 150|100",
    "0xA052": "SmartSolar MPPT 150|85",
    "0xA053": "SmartSolar MPPT 75|15",
    "0xA054": "SmartSolar MPPT 75|10",
    "0xA055": "SmartSolar MPPT 100|15",
    "0xA056": "SmartSolar MPPT 100|30",
    "0xA057": "SmartSolar MPPT 100|50",
    "0xA058": "SmartSolar MPPT 150|35",
    "0xA059": "SmartSolar MPPT 150|100 rev2",
    "0xA05A": "SmartSolar MPPT 150|85 rev2",
    "0xA05B": "SmartSolar MPPT 250|70",
    "0xA05C": "SmartSolar MPPT 250|85",
    "0xA05D": "SmartSolar MPPT 250|60",
    "0xA05E": "SmartSolar MPPT 250|45",
    "0xA05F": "SmartSolar MPPT 100|20",
    "0xA060": "SmartSolar MPPT 100|20 48V",
    "0xA061": "SmartSolar MPPT 150|45",
    "0xA062": "SmartSolar MPPT 150|60",
    "0xA063": "SmartSolar MPPT 150|70",
    "0xA064": "SmartSolar MPPT 250|85 rev2",
    "0xA065": "SmartSolar MPPT 250|100 rev2",
    "0xA102": "SmartSolar MPPT VE.Can 150/70",
    "0xA103": "SmartSolar MPPT VE.Can 150/45",
    "0xA104": "SmartSolar MPPT VE.Can 150/60",
    "0xA105": "SmartSolar MPPT VE.Can 150/85",
    "0xA106": "SmartSolar MPPT VE.Can 150/100",
    "0xA107": "SmartSolar MPPT VE.Can 250/45",
    "0xA108": "SmartSolar MPPT VE.Can 250/60",
    "0xA109": "SmartSolar MPPT VE.Can 250/70",
    "0xA10A": "SmartSolar MPPT VE.Can 250/85",
    "0xA10B": "SmartSolar MPPT VE.Can 250/100",
    "0xA201": "Phoenix Inverter 12V 250VA 230V",
    "0xA202": "Phoenix Inverter 24V 250VA 230V",
    "0xA204": "Phoenix Inverter 48V 250VA 230V",
    "0xA211": "Phoenix Inverter 12V 375VA 230V",
    "0xA212": "Phoenix Inverter 24V 375VA 230V",
    "0xA214": "Phoenix Inverter 48V 375VA 230V",
    "0xA221": "Phoenix Inverter 12V 500VA 230V",
    "0xA222": "Phoenix Inverter 24V 500VA 230V",
    "0xA224": "Phoenix Inverter 48V 500VA 230V",
    "0xA231": "Phoenix Inverter 12V 250VA 230V",
    "0xA232": "Phoenix Inverter 24V 250VA 230V",
    "0xA234": "Phoenix Inverter 48V 250VA 230V",
    "0xA239": "Phoenix Inverter 12V 250VA 120V",
    "0xA23A": "Phoenix Inverter 24V 250VA 120V",
    "0xA23C": "Phoenix Inverter 48V 250VA 120V",
    "0xA241": "Phoenix Inverter 12V 375VA 230V",
    "0xA242": "Phoenix Inverter 24V 375VA 230V",
    "0xA244": "Phoenix Inverter 48V 375VA 230V",
    "0xA249": "Phoenix Inverter 12V 375VA 120V",
    "0xA24A": "Phoenix Inverter 24V 375VA 120V",
    "0xA24C": "Phoenix Inverter 48V 375VA 120V",
    "0xA251": "Phoenix Inverter 12V 500VA 230V",
    "0xA252": "Phoenix Inverter 24V 500VA 230V",
    "0xA254": "Phoenix Inverter 48V 500VA 230V",
    "0xA259": "Phoenix Inverter 12V 500VA 120V",
    "0xA25A": "Phoenix Inverter 24V 500VA 120V",
    "0xA25C": "Phoenix Inverter 48V 500VA 120V",
    "0xA261": "Phoenix Inverter 12V 800VA 230V",
    "0xA262": "Phoenix Inverter 24V 800VA 230V",
    "0xA264": "Phoenix Inverter 48V 800VA 230V",
    "0xA269": "Phoenix Inverter 12V 800VA 120V",
    "0xA26A": "Phoenix Inverter 24V 800VA 120V",
    "0xA26C": "Phoenix Inverter 48V 800VA 120V",
    "0xA271": "Phoenix Inverter 12V 1200VA 230V",
    "0xA272": "Phoenix Inverter 24V 1200VA 230V",
    "0xA274": "Phoenix Inverter 48V 1200VA 230V",
    "0xA279": "Phoenix Inverter 12V 1200VA 120V",
    "0xA27A": "Phoenix Inverter 24V 1200VA 120V",
    "0xA27C": "Phoenix Inverter 48V 1200VA 120V",
    "0xA281": "Phoenix Inverter 12V 1600VA 230V",
    "0xA282": "Phoenix Inverter 24V 1600VA 230V",
    "0xA284": "Phoenix Inverter 48V 1600VA 230V",
    "0xA291": "Phoenix Inverter 12V 2000VA 230V",
    "0xA292": "Phoenix Inverter 24V 2000VA 230V",
    "0xA294": "Phoenix Inverter 48V 2000VA 230V",
    "0xA2A1": "Phoenix Inverter 12V 3000VA 230V",
    "0xA2A2": "Phoenix Inverter 24V 3000VA 230V",
    "0xA2A4": "Phoenix Inverter 48V 3000VA 230V",
    "0xA340": "Phoenix Smart IP43 Charger 12|50 (1+1)",
    "0xA341": "Phoenix Smart IP43 Charger 12|50 (3)",
    "0xA342": "Phoenix Smart IP43 Charger 24|25 (1+1)",
    "0xA343": "Phoenix Smart IP43 Charger 24|25 (3)",
    "0xA344": "Phoenix Smart IP43 Charger 12|30 (1+1)",
    "0xA345": "Phoenix Smart IP43 Charger 12|30 (3)",
    "0xA346": "Phoenix Smart IP43 Charger 24|16 (1+1)",
    "0xA347": "Phoenix Smart IP43 Charger 24|16 (3)"
};

const csTable = {
    "0": "Off",
    "1": "Low power",
    "2": "Fault",
    "3": "Bulk",
    "4": "Absorption",
    "5": "Float",
    "6": "Storage",
    "7": "Equalize (manual)",
    "9": "Inverting",
    "11": "Power supply",
    "245": "Starting-up",
    "246": "Repeated absorption",
    "247": "Auto equalize / Recondition",
    "248": "BatterySafe",
    "252": "External Control"
};

const errorTable = {
    "0": "No error",
    "2": "Battery voltage too high",
    "17": "Charger temperature too high",
    "18": "Charger over current",
    "19": "Charger current reversed",
    "20": "Bulk time limit exceeded",
    "21": "Current sensor issue (sensor bias/sensor broken)",
    "26": "Terminals overheated",
    "28": "Converter issue (dual converter models only)",
    "33": "Input voltage too high (solar panel)",
    "34": "Input current too high (solar panel)",
    "38": "Input shutdown (due to excessive battery voltage)",
    "39": "Input shutdown (due to current flow during off mode)",
    "65": "Lost communication with one of devices",
    "66": "Synchronised charging device configuration issue",
    "67": "BMS connection lost",
    "68": "Network misconfigured",
    "116": "Factory calibration data lost",
    "117": "Invalid/incompatible firmware",
    "119": "User settings invalid"
}

const mpptTable = {
    "0": "Off",
    "1": "Voltage or current limited",
    "2": "MPP Tracker active"
};

function lookup(frame, table, key, val) {
    if (val in table) {
        frame[key] = table[val];
    } else {
        frame[key] = val;
    }
}

/**
 * Mapping between field labels and more descriptive 
 * labels.   Also maps data types and takes care of scaling.
 *
 * Useful for storing directly into time series databases.
 * 
 * Based on v3.27 of the VE.Direct protocol available at:
 * https://www.victronenergy.com/support-and-downloads/whitepapers
 */
const translations = {
    "CS": function(frame, val) {
        lookup(frame, csTable, "control_state", val);
        frame["control_state_code"] = parseInt(val);
    },
    "ERR": function(frame, val) {
        lookup(frame, errorTable, "error", val);
        frame["error_code"] = parseInt(val);
    },
    "FW": function(frame, val) {
        frame["firmware_revision"] = parseInt(val);
    },
    "FWE": function(frame, val) {
        frame["firmware_revision"] = parseInt(val);
    },
    "H1": function(frame, val) {
        frame["deepest_discharge_depth"] = parseInt(val) / 1000;
    },
    "H2": function(frame, val) {
        frame["last_discharge_depth"] = parseInt(val) / 1000;
    },
    "H3": function(frame, val) {
        frame["average_discharge_depth"] = parseInt(val) / 1000;
    },
    "H4": function(frame, val) {
        frame["number_of_discharge_cycles"] = parseInt(val);
    },
    "H5": function(frame, val) {
        frame["number_of_full_discharges"] = parseInt(val);
    },
    "H6": function(frame, val) {
        frame["ahr_drawn"] = parseInt(val) / 1000.0;
    },
    "H7": function(frame, val) {
        frame["min_main_voltage"] = parseInt(val) / 1000.0;
    },
    "H8": function(frame, val) {
        frame["max_main_voltage"] = parseInt(val) / 1000.0;
    },
    "H15": function(frame, val) {
        frame["min_aux_voltage"] = parseInt(val) / 1000.0;
    },
    "H16": function(frame, val) {
        frame["max_aux_voltage"] = parseInt(val) / 1000.0;
    },
    "H19": function(frame, val) {
        frame["yield_total"] = parseInt(val) / 100.0;
    },
    "H20": function(frame, val) {
        frame["yield_today"] = parseInt(val) / 100.0;
    },
    "H21": function(frame, val) {
        frame["max_power_today"] = parseInt(val);
    },
    "H22": function(frame, val) {
        frame["yield_yesterday"] = parseInt(val) / 100.0;
    },
    "H23": function(frame, val) {
        frame["max_power_yesterday"] = parseInt(val);
    },
    "HSDS": function(frame, val) {
        frame["day_number"] = parseInt(val);
    },
    "I": function(frame, val) {
        frame["current"] = Number(val);
    },
    "LOAD": function(frame, val) {
        frame["load"] = (val == "ON" ? 1 : 0);
    },
    "MPPT": function(frame, val) {
        lookup(frame, mpptTable, "mppt_mode", val);
    },
    "OR": function(frame, val) {
        frame["off_reason"] = parseInt(val);
    },
    "SER#": function(frame, val) {
        frame["serial_number"] = val;
    },
    "PID": function(frame, val) {
        lookup(frame, productIDTable, "product", val);
        frame["product_id"] = parseInt(val);
    },
    "PPV": function(frame, val) {
        frame["panel_power"] = parseInt(val);
    },
    "RELAY": function(frame, val) {
        frame["relay"] = (val == "ON" ? 1 : 0);
    },
    "V": function(frame, val) {
        frame["voltage"] = parseInt(val) / 1000.0;
    },
    "VPV": function(frame, val) {
        frame["panel_voltage"] = parseInt(val) / 1000.0;
    },
};

module.exports = function(RED) {

    function VeDirectNode(config) {

        RED.nodes.createNode(this, config);
        this.checksum = 0;
        this.blocklen = 0;
        this.frame = new Object();

        this.on('input', function(msg, send, done) {

            for (const value of msg.payload.values())
                this.checksum += value;

            var tab_idx = msg.payload.indexOf("\t");

            if (tab_idx >= 0) {
                var key = msg.payload.toString("utf8", 0, tab_idx).toUpperCase();
                var val = msg.payload.toString("utf8", tab_idx + 1, msg.payload.length - 2);

                if (key in translations) {
                    translations[key](this.frame, val);
                } else if (key == "CHECKSUM") {

                    if (this.checksum != 0 && this.checksum % 256 == 0) {

                        msg.payload = this.frame;
                        send(msg);
                    } else {
                        msg.payload = this.checksum;

                    }
                    this.checksum = 0;
                    this.frame = new Object();
                } else {
                    this.frame[key] = val;
                }
            }

            // Once finished, call 'done'.
            // This call is wrapped in a check that 'done' exists
            // so the node will work in earlier versions of Node-RED (<1.0)
            if (done) {
                done();
            }
        });

    }
    RED.nodes.registerType("VE.Direct", VeDirectNode);
}
