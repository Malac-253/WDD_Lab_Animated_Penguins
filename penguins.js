
var mainCode = function(classRoom){
    //declare these as varaibles to make it easier to fine tune them.
    
    console.log(classRoom[0].quizes)
    
    
    
        var screen = {width:600, height : 700}
        var margins = {top:10, right : 50, bottom : 50, left:50}
    //sets up the svg, scales, and axes
        var setup = function (array2D)
        {
            //console.log("14", array2D[0])
            d3.select("svg")
                .attr("width", screen.width)
                .attr("height", screen. height)
                .append("g")
                .attr("id", "graph")
                .attr("transform", "translate ("+margins.left+","+margins.top+") ");
                        
        //only use the width and height after the margins
            var width = screen.width - margins.left - margins.right;
            var height = screen.height - margins.top - margins.bottom;
              
            var xScale =d3.scaleLinear()
                            .domain([0,38])//only use min/max if you don't know dataset
                            .range([0,width ])
            
            //console.log("y",d3.min(array2D[0].arr),d3.max(array2D[0].arr))
            
            //console.log("x",0,(array2D[0].arr.length)-1)
            //console.log("dd",array2D[0].arr)
            
            var yScale = d3.scaleLinear()
                            .domain([0,10])
                            .range([height, 0])
      
            //other colors? https://github . com/d3/d3 -scale-chromatic
            //var cScale = d3.scaleOrdinal (d3 . schemeTableau10)
        
            //plug in the axs
            var xAxis = d3.axisBottom(xScale)
            var yAxis = d3.axisLeft(yScale)
            
            d3.select("svg")
                .append("g")
                .classed("axis" , true) ;
            
            d3.select(".axis ")
                .append("g")
                .attr("id", "XAxis")
                .attr("transform", "translate ( " +margins . left+", "+(margins.top+height)+")").call(xAxis)
      
            d3.select(".axis ")
                .append("g")
                .attr("id", "yAxis")
                .attr("transform", "translate ( 25, "+margins.top+") ")
                .call(yAxis)
            
            //drawLegend(array2D,cScale);
            d3.select ("#graph")
                .selectAll("circle")
                .data (array2D[0])
                .enter()
                .append("circle")
                .on("mouseover", function(num, index){
                                
                                d3.select("#tooltip").text(index + " , " + num)
                                .classed("hidden", false)
                                .style("left", ((d3.event.pageX+6) + "px"))
                                .style("top", ((d3.event.pageY-79) + "px"))
                                
                                //console.log(d3.event.pageX);
                                //console.log(d3.event.pageY);
                            })
               .on("mouseout", function(){
                                d3.select("#tooltip").classed("hidden", true);
                            })
            
            var scales = [xScale, yScale];
            return scales;
        }
        
        var drawLegend = function(array2D, cScale)
        {
            d3.select("svg")
                .append("g").attr("id", "legend")
                .attr("transform", "translate (" +
                        (screen.width-margins . right)
                        +"," +(margins.top)+")");
            
            var gs = d3.select("#legend")
                .selectAll ("g")
                .data(array2D)
                .enter()
                .append("g")
                .attr ("fill",function(arr)
                    {return cScale(arr.name);})
                .attr("transform", function (arr,i)
                    {return "translate (0, "+(i*14) +") ";})
             
                gs.append("rect").attr("width",10).attr("height", 10) ;
            
                gs.append("text")
                    .text(function(arr){return arr.name})
                    .attr("x", 15)
                    .attr("y", 10)
                    .attr("fill", "black")
        }
        
        var drawArray = function(array2D, xScale, yScale,index)
        {
            var arrays = d3.select ("#graph")
                            .selectAll("circle")
                            .data (array2D[index])
                            .transition()
                            .attr("fill","#1289A7")
                            .attr("cx", function (num,index){return xScale (index);})
                            .attr("cy", function (num,index){return yScale (num);})
                            .attr("r", 5 )
                            
    
            
            //what about a curved line?-pick one
            //https://cemrajc.github.io/d3-curve-comparison/
            /*
            var lineGenerator = d3.line()
                .x(function (num,index) {return xScale(index)})
                .y(function (num) {return yScale (num)})
                .curve(d3.curveBasis)
            
            //uses the bound data to find the array to attach
            arrays.datum(function (obj ) {console.log(obj.arr);return obj.arr})
                .append('path')
                .attr("id","sss")
                .attr("d",lineGenerator)
            */
        }
  
        //Creates the Buttons
        var drawButtons = function(classRoom){
        
            var quizGrades = classRoom.map(function(element){

                var quizes = element.quizes;
                var quizGrades = quizes.map(function(element2)
                {
                    return element2.grade;    
                })
                return quizGrades;
                })
            
            var scales = setup(quizGrades)
            
            
            
            d3.select("#tables")
                .append("div")
                .attr("id","buttonHolder")
                .append("table")
                .attr("id","buttonHoldertab")
                .append("tr")
                .attr("id","buttonHolderRow")
            
            d3.select("#buttonHolder")
                .selectAll("td")
                .data(quizGrades)
                .enter()
                .append("td")
                .attr("id",function(d,index){return ("indexA"+index)})
                .attr("class","main_table_rows")
                .text(function(d,index){return ("Name: "+ classRoom[index].picture.replace("-300px.png", "").replace("-", " ")) })   
                .on("click",
                    function(d,index){
                    //setDrawdata(classRoom,d.picture);
                    //console.log("Day "+d.day);
                    //console.log(index);
                    drawArray(quizGrades,scales[0],scales[1],index)
                    })
                .on("mouseover",
                    function(d){
                    //d3.select("#day"+d.day)
                        //.append("table")
                    //setDrawdata(classRoom,d.day);
                    //console.log("Day "+d.day);
                    })
                .append("img")
                .attr("src",function(d,index){return classRoom[index].picture})
                .attr("class","fakeButton")
            
            d3.select("#tables")
                .append("table")
                .attr("id","pageHolder")
                .append("tr")
                .attr("id","pageHolderRow") 

            d3.select("#tables") 
                .append("td")
            
            //setup(quizGrades); //start it all off
            drawArray(quizGrades,scales[0],scales[1],0)
            
    } 
        
        var data = [
            {name:"Fred", arr: [3,5,7,9,1,2,4,6,8,10] },
            {name:"Jeff", arr: [9,8,8,6,6,4,4,2,1,0] },
            {name:"mala", arr: [10,8,4,6,6,5,4,7,1,1] },
        ]
        
        drawButtons(classRoom)
    
        //console.log("146",quizGrades)
        

    
}

var mainStartPromise = function(){                    
    var dataPromise = d3.json("https://malac-253.github.io/WDD_Lab_Grades_by_Day/classData.json")
        dataPromise.then(
            function(classRoom){
                    console.log(classRoom)
                    mainCode(classRoom)
            },function(err){
                    console.log("fail")
            })
}



//Start
mainStartPromise()