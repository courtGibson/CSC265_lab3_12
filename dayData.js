var gradeDataP = d3.json("gradeDataTime.json");

gradeDataP.then(function(data)
{
  var width = 600;
  var height = 400;
  var current = 0;
  console.log("data", data);
  init(data, width, height, 0);
  var currDay = update(data, current);
  
},
  function(err)
{
  console.log(err);
})

var init = function(data, w, h, current)
{
  var barWidth = w/data[0].grades.length;
  var svg = d3.select("svg")
              .attr("width", w)
              .attr("height", h)

  svg.selectAll("rect")
      .data(data[0].grades)
      .enter()
      .append("rect")
      .attr("height", function(d){return 200;})
      .attr("width", function(d){return barWidth;})
      .attr("x", function(d, i){return (i*barWidth)+(i*10);})
      .attr("y", function(d, i){return 0;})
      .attr("fill","blue");
}

var update = function(changeVal, data, current)
{
  var currDay = parseInt(document.getElementById("curr").textContent);
  currDay += changeVal;
  var newCurrDay = document.getElementById("curr").innerHTML = currDay;

  return currDay;

}
