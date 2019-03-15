var gradeDataP = d3.json("gradeDataTime.json");

gradeDataP.then(function(data)
{


  var screen =
  {
    width: 600,
    height: 400
  }


    var margins =
    {
      top: 10,
      bottom: 50,
      left: 50,
      right: 50
    }

  var width = screen.width-margins.left-margins.right;
  var height = screen.height-margins.top-margins.bottom;

  var barWidth = width/4;

  var yScale = d3.scaleLinear()
                .domain([0,100])
                .range([0,height]);

  var xScale = d3.scaleLinear()
                .domain([0,4])
                .range([0,width])

  var colors = d3.scaleOrdinal(d3.schemeAccent);



  /*d3.scaleOrdinal()
                .domain([1,2,3,4])
                .range([0,width]);*/

  console.log("data", data);
  init(data, width, height, 0, xScale, yScale, barWidth, colors, margins);
  update(data, width, height, xScale, yScale, barWidth, colors, margins);


},
  function(err)
{
  console.log(err);
})

var init = function(data, w, h, current, xScale, yScale, barWidth, colors, margins)
{

  var svg = d3.select("svg")
              .attr("width", 600)
              .attr("height", 400)

  var xAxis  = d3.axisBottom(xScale)
                .scale(xScale)
                .tickValues([.5,1.5,2.5,3.5])
                .tickFormat(["Fred"])



  var yAxis  = d3.axisLeft(yScale);

  svg.append("g")
         .classed(xAxis,true)
         .call(xAxis)
         .attr("transform","translate("+margins.left+","
         +(margins.top+ h)+")"
       );




   svg.append("g")
     .classed(yAxis,true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left-20)+","
     + 5 +")");




  svg.selectAll("rect")
      .data(data[0].grades)
      .enter()
      .append("rect")
      .attr("height", function(d){return yScale(0);})
      .attr("width",barWidth-20)
      .attr("x", function(d, i){return xScale(i+.5);})
      .attr("y", function(d, i){return h-yScale(d.grade);})
      .attr("fill",function(d) {return colors(d.name);})
      .on("mouseover", function(d) {

      //Get this bar's x/y values, then augment for the tooltip
      var xPosition = parseFloat(d3.select(this).attr("x")) + barWidth / 2;
      var yPosition = parseFloat(d3.select(this).attr("y")) + 14;
      //Create the tooltip label
      svg.append("text")
        .attr("id", "tooltip")
        .attr("x", xPosition)
        .attr("y", yPosition)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text(d.name);

      })
      .on("mouseout", function() {

          //Remove the tooltip
          d3.select("#tooltip").remove();

      })



    }

var update = function(data, w, h, xScale, yScale, barWidth, colors, margins)
{
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
        .transition()
        .attr("height", function(d,i){return yScale(d.grade);})
        .attr("width", barWidth-20)
        .attr("x", function(d, i){return xScale(i+.5);})
        .attr("y", function(d, i){return h-yScale(d.grade);})
        .attr("fill",function(d) {return colors(d.name);})
        .on("mouseover", function(d){d.name})
        .append("title")
        .text(function(d) {
       return d.name;
     });
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
        .transition()
        .attr("height", function(d,i){return yScale(d.grade);})
        .attr("width", barWidth-20)
        .attr("x", function(d, i){return xScale(i+.5);})
        .attr("y", function(d, i){return h-yScale(d.grade);})
        .attr("fill",function(d) {return colors(d.name);})

  }

});

}
