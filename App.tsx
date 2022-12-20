import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const INITIAL_STATE = {
  /**
   * The result of the last operation, which is also the first operand for the
   * current operation.
   */
  result: 0,
  /**
   * The string i.e. sequence of digits (and dot) entered by the user, which is
   * used as the second operand for the operation once it is triggered.
   */
  entry: "",
  /**
   * The operator applied to the first operand (`result`) and the second one
   * (`entry`).
   */
  operator: "+",
};

export default function App() {
  const [result, setResult] = React.useState(INITIAL_STATE.result);
  const [entry, setEntry] = React.useState(INITIAL_STATE.entry);
  const [operator, setOperator] = React.useState(INITIAL_STATE.operator);

  const clear = () => {
    setResult(INITIAL_STATE.result);
    setEntry(INITIAL_STATE.entry);
    setOperator(INITIAL_STATE.operator);
  };

  const deleteChar = () => {
    setEntry(entry.slice(0, -1));
  };

  const handleOperatorPress = (pressed: string) => {
    calculateResult();
    setOperator(pressed);
  };

  const calculateResult = () => {
    if (entry) {
      const newResult = eval(`${result} ${operator} ${entry}`);
      setResult(newResult);
      setEntry(INITIAL_STATE.entry);
    }
  };

  const handleNumberPress = (pressed: string) => {
    // Append pressed char, but not if the current entry is 0, which would
    // cause a leading to be displayed.
    const newEntryValue = entry === "0" ? pressed : `${entry}${pressed}`;

    setEntry(newEntryValue);
  };

  const display = () => {
    if (entry.length > 5 && entry.length < 9) {
      return (
        <Text numberOfLines={1} style={[styles.displayText, { fontSize: 70 }]}>
          {entry}
        </Text>
      );
    }

    if (entry.length > 7) {
      return (
        <Text numberOfLines={1} style={[styles.displayText, { fontSize: 50 }]}>
          {entry}
        </Text>
      );
    }

    if (!entry) {
      return (
        <Text numberOfLines={1} style={styles.displayText}>
          {result}
        </Text>
      );
    }

    if (entry && entry.length < 6) {
      return (
        <Text numberOfLines={1} style={styles.displayText}>
          {entry}
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          minimumFontScale={0.2}
          style={styles.displayText}
        >
          {entry || result}
        </Text>
      </View>
      <View style={styles.btnPad}>
        <View style={styles.row}>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.btn, styles.btnAccent]}
              onPress={clear}
            >
              <Text style={styles.btnText}>C</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.btn, styles.btnAccent]}
              onPress={() => handleOperatorPress("/")}
            >
              <Text style={styles.btnText}>÷</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnAccent]}
              onPress={() => handleOperatorPress("*")}
            >
              <Text style={styles.btnText}>×</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleNumberPress("7")}
          >
            <Text style={styles.btnText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleNumberPress("8")}
          >
            <Text style={styles.btnText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleNumberPress("9")}
          >
            <Text style={styles.btnText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.btnAccent]}
            onPress={() => handleOperatorPress("-")}
          >
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleNumberPress("4")}
          >
            <Text style={styles.btnText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleNumberPress("5")}
          >
            <Text style={styles.btnText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleNumberPress("6")}
          >
            <Text style={styles.btnText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.btnAccent]}
            onPress={() => handleOperatorPress("+")}
          >
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.row, styles.doubledRow]}>
          <View style={{ flex: 3 }}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleNumberPress("1")}
              >
                <Text style={styles.btnText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleNumberPress("2")}
              >
                <Text style={styles.btnText}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleNumberPress("3")}
              >
                <Text style={styles.btnText}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleNumberPress("0")}
              >
                <Text style={styles.btnText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleNumberPress(".")}
              >
                <Text style={styles.btnText}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={deleteChar}>
                <Text style={styles.btnText}>⌫</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[styles.btn, styles.btnAccent]}
              onPress={calculateResult}
            >
              <Text style={styles.btnText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 150,
    marginBottom: 90,
  },
  btnPad: {
    flex: 1,
  },
  btn: {
    borderRadius: 20,
    backgroundColor: "beige",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    flex: 1,
  },
  btnAccent: {
    backgroundColor: "aquamarine",
  },
  btnText: {
    fontSize: 20,
    fontWeight: "400",
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  doubledRow: {
    flex: 2,
  },
  displayContainer: {
    height: 120,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  displayText: {
    fontSize: 100,
    color: "gray",
    fontWeight: "300",
    flexWrap: "nowrap",
  },
});
