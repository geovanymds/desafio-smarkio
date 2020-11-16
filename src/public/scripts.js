async function getAnalytics() {
  const response = await fetch("http://localhost:8080/messages/analytics");
  const json = await response.json();

  const topBox = document.querySelectorAll(".topBox");

  const keys = Object.keys(json);
  const values = Object.values(json);

  topBox[0].children[0].innerText = "Mensagens";
  topBox[0].children[1].innerText = +values[0];

  topBox[1].children[0].innerText = "Mensagens /mês";
  topBox[1].children[1].innerText = +values[1];

  topBox[2].children[0].innerText = keys[2];
  topBox[2].children[1].innerText = +values[2];

  topBox[3].children[0].innerText = keys[3];
  topBox[3].children[1].innerText = +values[3];

  topBox[4].children[0].innerText = keys[4];
  topBox[4].children[1].innerText = +values[4];

  const ul = document.querySelector(".analytics");

  keys.forEach((key, index) => {
    const li = document.createElement("li");
    const liKey = document.createElement("p");
    liKey.appendChild(document.createTextNode(key));
    const liValue = document.createElement("p");
    liValue.appendChild(document.createTextNode(values[index]));
    li.appendChild(liKey);
    li.appendChild(liValue);
    li.classList.add("listItem");
    ul.appendChild(li);
  });
}

async function getTrendIntention() {
  const response = await fetch(
    "http://localhost:8080/intentions/trendIntentions?begin=2020-07-01&end=2020-07-30&intention=Sed similique sequi ut magnam."
  );
  const json = await response.json();

  const title = "Dados de Julho";

  const values = json.map((trend) => {
    return +trend.percent;
  });

  const ids = json.map((trend) => {
    return trend.name.split(" ")[0];
  });

  const ctx = document.getElementById("myChart").getContext("2d");

  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "bar",

    data: {
      labels: ids,
      datasets: [
        {
          label: "Intenções com maior porcentagem de aprovação",
          backgroundColor: "#ffa600",
          data: values,
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
}

async function getMessageByIntention() {
  const response = await fetch(
    "http://localhost:8080/messages/messagesByIntention?begin=2020-07-01&end=2020-07-30"
  );

  const json = await response.json();

  console.log(json);

  const values = json
    .map((element) => {
      return {id: element.intention_id,count: element.count};
    })
    .sort((a,b)=>{
      return a.count > b.count
    })
    .reverse()
    .slice(1, 6);

  console.log(values);

  const newValues = values.map((value)=>{
    return value.count;
  });

  const ids = values.map((value)=>{
    return "Intention" + value.id + " Messages"; 
  });

  data = {
    datasets: [
      {
        data: newValues,
        backgroundColor: [
          "#f95d6a",
          "#ff7c43",
          "#a05195",
          "#665191",
          "#ffa600",
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [...ids],
  };

  const ctx = document.getElementById("pieChart").getContext("2d");

  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "doughnut",
    data: data,
    // Configuration options go here
    options: {},
  });
}

function init() {
  getAnalytics();
  getTrendIntention();
  getMessageByIntention();
}

init();
