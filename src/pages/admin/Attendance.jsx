import PageTable from "../../components/PageTable";

const CLASSES = ["6-A","6-B","7-A","7-B","8-A","8-B","9-A","9-B","10-A","10-B"];

const badge = v => (
  <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600,
    background: v==="Present"?"var(--bg-badge-green)":v==="Late"?"var(--bg-badge-amber)":"var(--bg-badge-red)",
    color:      v==="Present"?"var(--text-green)":v==="Late"?"var(--text-amber)":"var(--text-red)" }}>{v}</span>
);

const data = [
  { id:"01", name:"Ahmed Khan",   class:"10-A", roll:"01", date:"2025-05-20", status:"Present" },
  { id:"02", name:"Ali Raza",     class:"10-A", roll:"02", date:"2025-05-20", status:"Present" },
  { id:"03", name:"Hamza Ali",    class:"10-B", roll:"03", date:"2025-05-20", status:"Absent"  },
  { id:"04", name:"Saad Ahmed",   class:"9-A",  roll:"04", date:"2025-05-20", status:"Present" },
  { id:"05", name:"Usman Tariq",  class:"9-B",  roll:"05", date:"2025-05-20", status:"Late"    },
  { id:"06", name:"Bilal Khan",   class:"8-A",  roll:"06", date:"2025-05-20", status:"Absent"  },
  { id:"07", name:"Ayesha Malik", class:"8-B",  roll:"07", date:"2025-05-20", status:"Present" },
  { id:"08", name:"Zain Abbas",   class:"7-A",  roll:"08", date:"2025-05-20", status:"Present" },
];

export default function Attendance() {
  return (
    <PageTable
      title="Attendance"
      addLabel="Add Record"
      initialData={data}
      searchKeys={["name","class"]}
      addFields={[
        { key:"name",   label:"Student Name"                                              },
        { key:"class",  label:"Class",   type:"select", options:CLASSES                  },
        { key:"roll",   label:"Roll No"                                                   },
        { key:"date",   label:"Date",    type:"date"                                      },
        { key:"status", label:"Status",  type:"select", options:["Present","Absent","Late"] },
      ]}
      addEmpty={{ name:"", class:"", roll:"", date:"", status:"Present" }}
      columns={[
        { key:"name",   label:"Student",  primary:true },
        { key:"class",  label:"Class"                  },
        { key:"roll",   label:"Roll No"                },
        { key:"date",   label:"Date",     nowrap:true  },
        { key:"status", label:"Status",   render: v => badge(v) },
      ]}
    />
  );
}