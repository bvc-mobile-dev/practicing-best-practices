import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function App() {
  const [result, setResult] = React.useState(0);
  const [operator, setOperator] = React.useState("+");
  const [entry, setEntry] = React.useState("");
  const onPress = (pressed: string) => {
    if (pressed === "⌫") {
      return setEntry(entry.slice(0, -1));
    }
    if (["C", "=", "/", "*", "+", "-"].includes(pressed)) {
      if (pressed === "C") {
        setResult(0);
        setOperator("+");
        return setEntry("");
      }
      if (entry) {
        setResult(eval(String(`${result} ${operator} ${entry}`)));
        setEntry("");
      }
      if (pressed !== "=") {
        setOperator(pressed);
      }
    } else {
      setEntry(entry.replace(/^0/, "") + pressed);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 120,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginBottom: 20,
        }}
      >
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          minimumFontScale={0.2}
          style={styles.numbers}
        >
          {entry || result}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.btn2} onPress={() => onPress("C")}>
              <Text style={styles.button}>C</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.btn2} onPress={() => onPress("/")}>
              <Text style={styles.button}>÷</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn2} onPress={() => onPress("*")}>
              <Text style={styles.button}>×</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={() => onPress("7")}>
            <Text style={styles.button}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => onPress("8")}>
            <Text style={styles.button}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => onPress("9")}>
            <Text style={styles.button}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2} onPress={() => onPress("-")}>
            <Text style={styles.button}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={() => onPress("4")}>
            <Text style={styles.button}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => onPress("5")}>
            <Text style={styles.button}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => onPress("6")}>
            <Text style={styles.button}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2} onPress={() => onPress("+")}>
            <Text style={styles.button}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.doubleRow}>
          <View style={{ flex: 3 }}>
            <View style={styles.row}>
              <TouchableOpacity style={styles.btn} onPress={() => onPress("1")}>
                <Text style={styles.button}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => onPress("2")}>
                <Text style={styles.button}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => onPress("3")}>
                <Text style={styles.button}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.btn} onPress={() => onPress("0")}>
                <Text style={styles.button}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => onPress(".")}>
                <Text style={styles.button}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => onPress("⌫")}>
                <Text style={styles.button}>⌫</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.btn2} onPress={() => onPress("=")}>
              <Text style={styles.button}>=</Text>
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
  btn: {
    borderRadius: 20,
    backgroundColor: "beige",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    flex: 1,
  },
  btn2: {
    borderRadius: 20,
    backgroundColor: "aquamarine",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    flex: 1,
  },
  button: {
    fontSize: 20,
    fontWeight: "400",
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  doubleRow: {
    flexDirection: "row",
    flex: 2,
  },
  numbers: {
    fontSize: 100,
    color: "gray",
    fontWeight: "300",
    flexWrap: "nowrap",
  },
});
