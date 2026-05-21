import PageTable from "../../components/PageTable";

const SUBJECTS = ["Mathematics","Physics","Chemistry","English","Urdu","Biology","Computer","Islamiat"];
const CLASSES  = ["6-A","6-B","7-A","7-B","8-A","8-B","9-A","9-B","10-A","10-B"];
const STATUS   = ["Active","On Leave","Inactive"];

const badge = v => (
  <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600,
    background: v==="Active"?"var(--bg-badge-green)":v==="On Leave"?"var(--bg-badge-amber)":"var(--bg-badge-red)",
    color:      v==="Active"?"var(--text-green)"    :v==="On Leave"?"var(--text-amber)"    :"var(--text-red)" }}>
    {v}
  </span>
);

const data = [
  { id:"01", name:"Mr. Khalid",  subject:"Mathematics", email:"khalid@school.com",  phone:"0311-1111111", class:"10-A", status:"Active"   },
  { id:"02", name:"Ms. Ayesha",  subject:"Physics",     email:"ayesha@school.com",  phone:"0322-2222222", class:"10-B", status:"Active"   },
  { id:"03", name:"Mr. Hassan",  subject:"English",     email:"hassan@school.com",  phone:"0333-3333333", class:"9-A",  status:"Active"   },
  { id:"04", name:"Ms. Sara",    subject:"Chemistry",   email:"sara@school.com",    phone:"0344-4444444", class:"9-B",  status:"On Leave" },
  { id:"05", name:"Mr. Bilal",   subject:"Urdu",        email:"bilal@school.com",   phone:"0355-5555555", class:"8-A",  status:"Active"   },
  { id:"06", name:"Ms. Fatima",  subject:"Biology",     email:"fatima@school.com",  phone:"0366-6666666", class:"8-B",  status:"Active"   },
];

export default function Teachers() {
  return (
    <PageTable
      title="Teachers"
      addLabel="Add Teacher"
      initialData={data}
      searchKeys={["name","subject","email"]}
      addFields={[
        { key:"name",    label:"Full Name"                                   },
        { key:"subject", label:"Subject", type:"select", options:SUBJECTS    },
        { key:"email",   label:"Email",   type:"email"                       },
        { key:"phone",   label:"Phone"                                       },
        { key:"class",   label:"Class",   type:"select", options:CLASSES     },
        { key:"status",  label:"Status",  type:"select", options:STATUS      },
      ]}
      addEmpty={{ name:"", subject:"", email:"", phone:"", class:"", status:"Active" }}
      columns={[
        { key:"name",    label:"Teacher Name", primary:true },
        { key:"subject", label:"Subject"                    },
        { key:"email",   label:"Email"                      },
        { key:"phone",   label:"Phone",        nowrap:true  },
        { key:"class",   label:"Class"                      },
        { key:"status",  label:"Status",       render: v => badge(v) },
      ]}
    />
  );
}