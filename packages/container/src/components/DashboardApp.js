import * as React from "react";

import { mount } from "dashboard/DashboardApp";

function DashboardApp() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
}

export default DashboardApp;
