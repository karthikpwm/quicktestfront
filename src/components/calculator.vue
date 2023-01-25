<template>
  <div id="main-container">
    <div id="calculator-container">
      <p id="display">{{ this.displayValue }}</p>

      <div id="button-grid">
        <!-- First button row -->
        <button
          class="calculator-button function-button"
          @click="this.clearCalculator"
        >
          C
        </button>
        <button
          class="calculator-button function-button"
          @click="this.useLastAnswer"
        >
          ANS
        </button>
        <button class="calculator-button function-button" @click="backspace">
          DEL
        </button>
        <button
          class="calculator-button operation-button"
          :class="{ 'operation-button-selected': operator === '+' }"
          @click="applyOperator('+')"
        >
          +
        </button>

        <!-- Second button row -->
        <button class="calculator-button" @click="this.appendToDisplay('1')">
          1
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('2')">
          2
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('3')">
          3
        </button>
        <button
          class="calculator-button operation-button"
          :class="{ 'operation-button-selected': operator === '-' }"
          @click="applyOperator('-')"
        >
          -
        </button>

        <!-- Third button row -->
        <button class="calculator-button" @click="this.appendToDisplay('4')">
          4
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('5')">
          5
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('6')">
          6
        </button>
        <button
          class="calculator-button operation-button"
          :class="{ 'operation-button-selected': operator === 'x' }"
          @click="applyOperator('x')"
        >
          x
        </button>

        <!-- Fourth button row -->
        <button class="calculator-button" @click="this.appendToDisplay('7')">
          7
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('8')">
          8
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('9')">
          9
        </button>
        <button
          class="calculator-button operation-button"
          :class="{ 'operation-button-selected': operator === '/' }"
          @click="applyOperator('/')"
        >
          /
        </button>

        <!-- Fifth button row -->
        <button class="calculator-button" @click="this.invertDisplayValue">
          +/-
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('0')">
          0
        </button>
        <button class="calculator-button" @click="this.appendToDisplay('.')">
          ,
        </button>
        <button
          class="calculator-button operation-button"
          @click="this.equalsButton"
        >
          =
        </button>
      </div>
    </div>

    <div id="log-container">
      <h3> </h3>
      <div id="log-entries">
        <p class="log-entry" v-for="s in this.calculations" :key="s.id">
          {{
            s.firstNumber +
            " " +
            s.operator +
            " " +
            s.secondNumber +
            " = " +
            s.answer
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "Calculator",
  data() {
    return {
      displayValue: "0",
      operator: null,
      firstNumber: 0,
      secondNumber: 0,
      clearDisplayNext: false,
    };
  },
  methods: {
    appendToDisplay(char) {
      if (this.clearDisplayNext) {
        this.clearDisplay();
      }

      if (char == "." && this.displayValue.includes(".")) {
        return;
      }

      if (this.displayValue == "0" && char != ".") {
        this.displayValue = char;
      } else {
        this.displayValue += char;
      }
    },
    backspace() {
      if (this.clearDisplayNext) {
        this.clearDisplay();
      }

      this.displayValue = (this.displayValue + "").slice(0, -1);

      if ((this.displayValue + "").length === 0 || this.displayValue == "-") {
        this.clearDisplay();
      }
    },
    clearDisplay() {
      this.displayValue = 0;
      this.clearDisplayNext = false;
    },
    clearCalculator() {
      this.clearDisplay();
      this.clearCalculation();
    },
    clearCalculation() {
      this.operator = null;
      this.firstNumber = 0;
      this.secondNumber = 0;
    },
    invertDisplayValue() {
      if (this.clearDisplayNext) {
        this.clearDisplay();
      }

      if (this.displayValue.startsWith("-")) {
        this.displayValue = this.displayValue.slice(
          1,
          this.displayValue.length
        );
      } else {
        this.displayValue = "-" + this.displayValue;
      }
    },
    applyOperator(operator) {
      const operatorExist = this.operator !== null;
      const currentNumber = parseFloat(this.displayValue);

      if (!operatorExist) {
        this.clearDisplay();
        this.firstNumber = currentNumber;
        this.operator = operator;
      } else {
        this.secondNumber = currentNumber;
        this.calculate();
        this.firstNumber = this.lastAnswer;
        this.operator = operator;
        this.clearDisplayNext = true;
      }
    },
    equalsButton() {
      this.secondNumber = parseFloat(this.displayValue);
      this.calculate();
      this.clearCalculation();
      this.clearDisplayNext = true;
    },
    calculate() {
      this.$store
        .dispatch("calculate", {
          firstNumber: this.firstNumber,
          secondNumber: this.secondNumber,
          operator: this.operator,
        })
        .then(() => {
          this.displayValue = this.lastAnswer;
        })
        .catch((error) => {
          this.displayValue = error;
          this.clearDisplayNext = true;
        });
    },
    useLastAnswer() {
      this.displayValue = this.lastAnswer;
    },
  },
  computed: {
    calculations() {
      return this.$store.state.calculations;
    },
    lastAnswer() {
      return this.$store.getters.lastAnswer;
    },
  },
};
</script>

<!-- <style scoped src="@/assets/styles/calculator.css" /> -->
<style scoped>
#main-container {
    display: grid;
    grid-template-columns: 50% 50%;
    margin: auto;
    padding-bottom: 24px;
}

#calculator-container {
    padding: 8px;
    margin: auto;
    width: 340px;
}

#display {
    resize: none;
    border: none;
    text-align: right;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 48px;
    margin: 16px 16px 10px 10px;
    max-width: 100%;
    overflow-x: scroll;
}

#display::-webkit-scrollbar {
    display: none;
}

#button-grid {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
}

#log-container {
    margin: auto;
    width: 340px;
    padding-top: 24px;
}

#log-entries {
    border: black solid 1px;
    border-radius: 1px;
    height: 400px;
    overflow-y: scroll;
}

.log-entry {
    width: 90%;
    padding: 0px 0px 0px 16px;
    text-align: left;
    font-size: 16px;
}

.calculator-button {
    height: 75px;
    background: #34495E;
    border: none;
    color: white;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border-radius: 250px;
    margin: 5px;
    font-weight: bold;
}

.calculator-button:hover {
    filter: brightness(85%);
    cursor: pointer;
}

.calculator-button:active {
    filter: brightness(55%);
    cursor: pointer;
}

.operation-button {
    background: #43b985;
    font-size: 24px;
}

.operation-button-selected {
    background: #73d9ab;
    font-size: 24px;
}

.function-button {
    background: #4acc93;
    font-weight: normal;
}

@media (min-width: 800px) {

    #main-container {
        grid-template-columns: 50% 50%;
        max-width: 1050px;
    }

}

@media (max-width: 800px) {

    #main-container {
        grid-template-columns: none;
        grid-template-rows: auto auto;

    }
}

</style>