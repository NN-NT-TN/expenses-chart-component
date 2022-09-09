

const GetData = async () => {
  const response = await fetch('../Assets/data/data.json')
  const data = await response.json()
  return data
}
GetData().then(value => {
  array=value
}).then(function Drawchart(){
  const labels = array.map((item) =>item.day);
  const data = {
      labels: labels,
      datasets: [{
        label: '$',
        data: array.map((item) =>item.amount),
        backgroundColor: [
          'hsl(10, 79%, 65%)',
          'hsl(10, 79%, 65%)',
          'hsl(186, 34%, 60%)',
          'hsl(10, 79%, 65%)',
          'hsl(10, 79%, 65%)',
        ]
        
      }]
    };

new Chart("myChart", {
  type: "bar",
  data: data
  ,
  options: {
    elements:{
      bar:{
        borderRadius: 4.5
      }
    },
    plugins: {
      legend: {display: false},
      tooltip:{
        enabled: false,
        bodyFont: "DM_Sans" ,
        external: function(context) {
          // Tooltip Element
          let tooltipEl = document.getElementById('chartjs-tooltip');

          // Create element on first render
          if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              document.body.appendChild(tooltipEl);
          }

          // Hide if no tooltip
          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
          }

          // Set caret Position
          //tooltipEl.classList.remove('above', 'below', 'no-transform');
          if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
          } else {
              tooltipEl.classList.add('no-transform');
          }

          function getBody(bodyItem) {
              return bodyItem.lines;
          }

          // Set Text
          if (tooltipModel.body) {
              //const titleLines = tooltipModel.title || [];
              const bodyLines = tooltipModel.body.map(getBody);
            //console.log(bodyLines[0][0]);
              let innerHtml = '<thead>';

              //titleLines.forEach(function(title) {
              //    innerHtml += '<tr><th>' + title + '</th></tr>';
              //});
              innerHtml += '</thead><tbody>';

              bodyLines.forEach(function(body, i) {
                  console.log(body[i])
                  const colors = tooltipModel.labelColors[i];
                            let style = 'background:' + colors.backgroundColor;
                            style += '; border-color:' + colors.borderColor;
                            style += '; border-width: 2px';
                            style += '; color: white';
                            const span = '<span style="' + style + '"></span>';
                            innerHtml += '<tr><td>' + span + body[i].replace('$:', '$') + '</td></tr>';
              });
              innerHtml += '</tbody>';

              let tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
          }

          const position = context.chart.canvas.getBoundingClientRect();
          const {offsetLeft: positionX, offsetTop: positionY} = context.chart.canvas;

          const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);
          console.log(tooltipModel);
          // Display, position, and set styles for font
          tooltipEl.style.opacity = 1;
          tooltipEl.style.width = '48px';
          tooltipEl.style.textAlign = 'center';
          tooltipEl.style.background = 'var(--neutral-dark-brown)';
          tooltipEl.style.border = '2px solid var(--neutral-dark-brown)';
          tooltipEl.style.borderRadius= '4px'
          tooltipEl.style.color = 'white';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.left = positionX + tooltipModel.caretX-25.4 +'px';
          tooltipEl.style.top = positionY +  tooltipModel.caretY-30 + 'px';
          tooltipEl.style.font = bodyFont.string;
          tooltipEl.style.fontFamily = 'DM_Sans';
          tooltipEl.style.fontWeight = 700;
          tooltipEl.style.padding = tooltipModel.padding+ 'px ' + tooltipModel.padding + 'px';
          tooltipEl.style.pointerEvents = 'none';
      }
      }
  },
      scales: {
      x: {
        grid: {
          drawBorder: false,
          display: false,
        }
      },
      y: {     
            display: false,        
        },
    },
  
  }
});})
//console.log(readTextFile("/data.json",function(text){
//      data=JSON.parse(text)
//}));

