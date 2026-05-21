import PageTable from "../../components/PageTable";

const CLASSES = ["6-A","6-B","7-A","7-B","8-A","8-B","9-A","9-B","10-A","10-B"];
const GRADES  = ["A+","A","B+","B","C","D","F"];

const gradeEl = g => {
  const colors = { "A+":"var(--text-green)","A":"var(--text-green)","B+":"var(--text-blue)","B":"var(--text-blue)","C":"var(--text-amber)","D":"var(--text-red)","F":"var(--text-red)" };
  return <span style={{ fontWeight:700, color: colors[g] || "var(--text-primary)" }}>{g}</span>;
};

const data = [
  { id:"01", name:"Ahmed Khan",  class:"10-A", maths:"89", physics:"85", english:"92", total:"355", grade:"A+" },
  { id:"02", name:"Ali Raza",    class:"10-A", maths:"75", physics:"80", english:"78", total:"310", grade:"B+" },
  { id:"03", name:"Hamza Ali",   class:"10-B", maths:"60", physics:"65", english:"70", total:"255", grade:"C"  },
  { id:"04", name:"Saad Ahmed",  class:"9-A",  maths:"95", physics:"90", english:"88", total:"370", grade:"A+" },
  { id:"05", name:"Usman Tariq", class:"9-B",  maths:"82", physics:"79", english:"85", total:"330", grade:"A"  },
  { id:"06", name:"Bilal Khan",  class:"8-A",  maths:"70", physics:"72", english:"68", total:"280", grade:"B"  },
];

export default function Results() {
  return (
    <PageTable
      title="Results"
      addLabel="Add Result"
      initialData={data}
      searchKeys={["name","class"]}
      addFields={[
        { key:"name",    label:"Student Name"                              },
        { key:"class",   label:"Class",   type:"select", options:CLASSES  },
        { key:"maths",   label:"Maths",   type:"number"                   },
        { key:"physics", label:"Physics", type:"number"                   },
        { key:"english", label:"English", type:"number"                   },
        { key:"total",   label:"Total",   type:"number"                   },
        { key:"grade",   label:"Grade",   type:"select", options:GRADES   },
      ]}
      addEmpty={{ name:"", class:"", maths:"", physics:"", english:"", total:"", grade:"" }}
      columns={[
        { key:"name",    label:"Student",  primary:true },
        { key:"class",   label:"Class"                  },
        { key:"maths",   label:"Maths"                  },
        { key:"physics", label:"Physics"                },
        { key:"english", label:"English"                },
        { key:"total",   label:"Total",   render: v => <strong style={{color:"var(--text-primary)"}}>{v}</strong> },
        { key:"grade",   label:"Grade",   render: v => gradeEl(v) },
      ]}
    />
  );
}