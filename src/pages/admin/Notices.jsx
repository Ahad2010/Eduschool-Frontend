import PageTable from "../../components/PageTable";

const badge = v => (
  <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600,
    background: v==="Published"?"var(--bg-badge-green)":"var(--bg-badge-amber)",
    color:      v==="Published"?"var(--text-green)":"var(--text-amber)" }}>{v}</span>
);

const data = [
  { id:"01", title:"School Closed on May 25",  category:"Holiday",  audience:"All",      date:"2025-05-20", status:"Published" },
  { id:"02", title:"Annual Sports Day May 30",  category:"Event",    audience:"All",      date:"2025-05-18", status:"Published" },
  { id:"03", title:"Parents Meeting June 5",    category:"Meeting",  audience:"Parents",  date:"2025-05-15", status:"Published" },
  { id:"04", title:"Exam Schedule Released",    category:"Exam",     audience:"Students", date:"2025-05-10", status:"Published" },
  { id:"05", title:"Fee Submission Last Date",  category:"Fees",     audience:"Parents",  date:"2025-05-08", status:"Draft"     },
];

export default function Notices() {
  return (
    <PageTable
      title="Notices"
      addLabel="Add Notice"
      initialData={data}
      searchKeys={["title","category"]}
      addFields={[
        { key:"title",    label:"Notice Title"                                                              },
        { key:"category", label:"Category", type:"select", options:["Holiday","Event","Meeting","Exam","Fees","General"] },
        { key:"audience", label:"Audience", type:"select", options:["All","Students","Teachers","Parents"] },
        { key:"date",     label:"Date",     type:"date"                                                    },
        { key:"status",   label:"Status",   type:"select", options:["Published","Draft"]                   },
      ]}
      addEmpty={{ title:"", category:"", audience:"All", date:"", status:"Draft" }}
      columns={[
        { key:"title",    label:"Title",    primary:true },
        { key:"category", label:"Category"              },
        { key:"audience", label:"Audience"              },
        { key:"date",     label:"Date",     nowrap:true  },
        { key:"status",   label:"Status",   render: v => badge(v) },
      ]}
    />
  );
}