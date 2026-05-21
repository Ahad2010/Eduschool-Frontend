import PageTable from "../../components/PageTable";

const data = [
  { id:"01", name:"10-A", teacher:"Mr. Khalid",  students:"32", room:"101", time:"08:00 AM", status:"Active" },
  { id:"02", name:"10-B", teacher:"Ms. Ayesha",  students:"30", room:"102", time:"08:00 AM", status:"Active" },
  { id:"03", name:"9-A",  teacher:"Mr. Hassan",  students:"35", room:"103", time:"09:00 AM", status:"Active" },
  { id:"04", name:"9-B",  teacher:"Ms. Sara",    students:"28", room:"104", time:"09:00 AM", status:"Active" },
  { id:"05", name:"8-A",  teacher:"Mr. Bilal",   students:"33", room:"105", time:"10:00 AM", status:"Active" },
  { id:"06", name:"8-B",  teacher:"Ms. Fatima",  students:"31", room:"106", time:"10:00 AM", status:"Active" },
];

const badge = v => (
  <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600,
    background: v==="Active"?"var(--bg-badge-green)":"var(--bg-badge-red)",
    color:      v==="Active"?"var(--text-green)":"var(--text-red)" }}>{v}</span>
);

export default function Classes() {
  return (
    <PageTable
      title="Classes"
      addLabel="Add Class"
      initialData={data}
      searchKeys={["name","teacher"]}
      addFields={[
        { key:"name",     label:"Class Name"                                              },
        { key:"teacher",  label:"Class Teacher"                                           },
        { key:"students", label:"Total Students", type:"number"                           },
        { key:"room",     label:"Room Number"                                             },
        { key:"time",     label:"Class Time"                                              },
        { key:"status",   label:"Status", type:"select", options:["Active","Inactive"]   },
      ]}
      addEmpty={{ name:"", teacher:"", students:"", room:"", time:"", status:"Active" }}
      columns={[
        { key:"name",     label:"Class",    primary:true },
        { key:"teacher",  label:"Teacher"               },
        { key:"students", label:"Students"              },
        { key:"room",     label:"Room"                  },
        { key:"time",     label:"Time",     nowrap:true  },
        { key:"status",   label:"Status",  render: v => badge(v) },
      ]}
    />
  );
}