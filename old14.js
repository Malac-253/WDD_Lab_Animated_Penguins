
var mainCode = function(classRoom){
    
    //console.log(classRoom[0].quizes)
    
    //Converts the Data
    var setDrawdata = function(classRoom,pic){
        console.log(classRoom[0].quizes)
        var sheet = {gh:500, gw:500, ah:540, aw:540}     
        var classaxis = []
        var i = 1
        classRoom.forEach(function(person){
            if (person.picture == pic ){
                point = {}
            point.y = ((classRoom.quizes[day-1].grade/classRoom.quizes[day-1].max)*sheet.gh)
            point.x = ((i/40)*sheet.gw)
            classaxis.push(point)
            i = i + 1
                
            }
            
        })
        drawGraph(classaxis,sheet)   
    }
    
    //Creates the Buttons
    var drawButtons = function(classRoom){
        
        d3.select("#tables")
            .append("table")
            .attr("id","buttonHolder")
        d3.select("#buttonHolder")
            .selectAll("tr")
            .data(classRoom)
            .enter()
            .append("tr")
            .attr("id",function(d){return ("picture"+d.picture)})
            .append("td")
            .attr("class","main_table_rows")
            .text(function(d){return ("Name "+ d.picture.split('300')[0])})
            .on("click",
                function(d){
                setDrawdata(classRoom,d.picture);
                console.log("Day "+d.day);
                })
            .on("mouseover",
                function(d){
                d3.select("#day"+d.day)
                    //.append("table")
                //setDrawdata(classRoom,d.day);
                console.log("Day "+d.day);
                })
        d3.select("#tables")
            .append("table")
            .attr("id","pageHolder")
            .append("tr")
            .attr("id","pageHolderRow") 
        
        d3.select("#tables") 
            .append("td")
            
        
        
    }
        
    //Will draw the data of (x,y) point
    var drawGraph = function(data, sheet){
        console.log(data)
            d3.select("#graphs *").remove() //remove old graph 
            //add SVG holder tag
            d3.select("#graphs")
                .append("svg")
                .attr("width",sheet.aw)
                .attr("height",sheet.ah)
                .attr("id","sheet") 
            
            //draws box
            d3.select("#sheet")
                .append("rect")
                .attr("width",sheet.aw)
                .attr("height",sheet.ah)
                .attr("style","stroke-width:10; stroke:rgb(0,0,0);opacity:0.05")
            d3.select("#sheet")
                .append("rect")
                .attr("x",(sheet.ah-sheet.gh-2))
                .attr("y",2)
                .attr("width",sheet.gw)
                .attr("height",sheet.gh)
                .attr("style","fill:white")
            
        console.log(sheet.ah-sheet.gh)
            
            //axis x
            d3.select("#sheet")
                .append("rect")
                .attr("width",sheet.aw)
                .attr("height",5)
                .attr("x",2)
                .attr("y",sheet.aw-35)
             
            //axis y
            d3.select("#sheet")
                .append("rect")
                .attr("width",5)
                .attr("height",sheet.ah)
                .attr("x",(sheet.ah-sheet.gh-10))
                .attr("y",2)
        
            //adds points
            data.forEach(function(data){
                d3.select("#sheet")
                    .append("circle")
                    .attr("cy",data.y)
                    .attr("cx",data.x+(sheet.ah-sheet.gh-6))
                    .attr("r","3")
                    .attr("fill","black")               
        })      
        console.log("work")
    }
    
    drawButtons(classRoom)   
}

                    
var dataPromise = d3.json("classData.json")
    dataPromise.then(
        function(classRoom){
                console.log(classRoom)
                mainCode(classRoom)
        },function(err){
                console.log("fail")
        })
