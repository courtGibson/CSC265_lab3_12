var gradeDataP = d3.json("gradeDataTime.json");

gradeDataP.then(function(data)
{
  var width = 600;
  var height = 400;
  var barWidth = width/data[0].grades.length;

  var yScale = d3.scaleLinear()
                .domain([0,100])
                .range([height,0]);

  var xScale = d3.scaleLinear()
                .domain([0, barWidth*4+40])
                .range([0, width]);


  console.log("data", data);
  init(data, width, height, 0, xScale, yScale);
  update(data, width, height, xScale, yScale);


},
  function(err)
{
  console.log(err);
})

var init = function(data, w, h, current, xScale, yScale)
{
  var barWidth = w/data[0].grades.length;
  var svg = d3.select("svg")
              .attr("width", w)
              .attr("height", h)

  svg.selectAll("rect")
      .data(data[0].grades)
      .enter()
      .append("rect")
      .attr("height", function(d){return 3;})
      .attr("width", function(d){return barWidth;})
      .attr("x", function(d, i){return xScale(i+barWidth*i+20*i);})
      .attr("y", function(d, i){return h-yScale(100-d.grades);})
      .attr("fill","blue");
}

var update = function(data, w, h, xScale, yScale)
{
  var barWidth = w/data[0].grades.length;
  var svg = d3.select("svg");
  var prev = d3.select("#prev")
  var next = d3.select("#next")

  prev.on("click", function(d, i)
{

  var currDay = parseInt(document.getElementById("curr").textContent);
  console.log("prev button press: index ", currDay-2)
  var newDay = currDay - 1;
  if (newDay > 0 && newDay <= 10)
  {
    var newCurrDay = document.getElementById("curr").innerHTML = newDay;

    svg.selectAll("rect")
        .data(data[currDay-2].grades)
        .attr("height", function(d,i){return d.grade;})
        .attr("width", function(d){return barWidth;})
        .attr("x", function(d, i){return xScale(i+barWidth*i+20*i);})
        .attr("y", function(d, i){return h-yScale(100-d.grades);})
  }

});

  next.on("click", function(d, i)
{
  var currDay = parseInt(document.getElementById("curr").textContent);
  console.log("next button press: index ", currDay)
  var newDay = currDay + 1;
  console.log("data.grades.grade", data[0].grades[0].grade)
  if (newDay >= 0 && newDay <= 10)
  {
    var newCurrDay = document.getElementById("curr").innerHTML = newDay;


    svg.selectAll("rect")
        .data(data[currDay].grades)
        .attr("height", function(d,i){return d.grade;})
        .attr("width", function(d){return barWidth;})
        .attr("x", function(d, i){return xScale(i+barWidth*i+20*i);})
        .attr("y", function(d, i){return h-yScale(100-d.grades);})
  }

});

}
