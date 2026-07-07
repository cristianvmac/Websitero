


const Comparison = () => {
  return (
    <section id="comparison" className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Without using Boilerplate
      </h1>
      
      {/* DO The Format Like in AdKit */}
      <div className="bg-red-50 rounded-lg p-6 border-2 border-red-300 mb-6">
        <h2 className="text-2xl font-bold text-red-900 mb-4 text-center">
          ❌ Problems with WordPress Page Builders
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-red-800 mb-1">Performance Issues</h3>
            <p className="text-red-900">Poor mobile performance, bloated code affects Core Web Vitals and SEO rankings</p>
          </div>

          <div>
            <h3 className="font-semibold text-red-800 mb-1">Vendor Lock-in</h3>
            <p className="text-red-900">Deactivating breaks your site, nearly impossible to switch or migrate</p>
          </div>

          <div>
            <h3 className="font-semibold text-red-800 mb-1">Maintenance Headaches</h3>
            <p className="text-red-900">Constant updates, plugin conflicts, layouts can break unexpectedly</p>
          </div>

          <div>
            <h3 className="font-semibold text-red-800 mb-1">Hidden Costs</h3>
            <p className="text-red-900">Ongoing subscriptions, essential features behind paywalls, limited customization</p>
          </div>
        </div>
      </div>

      {/* Advantages of Custom Code */}
      <div className="bg-green-50 rounded-lg p-6 border-2 border-green-300">
        <h2 className="text-2xl font-bold text-green-900 mb-4 text-center">
          ✅ Advantages of Boilerplate
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-green-800 mb-1">Superior Performance</h3>
            <p className="text-green-900">Optimized Core Web Vitals, excellent mobile performance, better SEO rankings</p>
          </div>

          <div>
            <h3 className="font-semibold text-green-800 mb-1">Complete Control</h3>
            <p className="text-green-900">Full ownership, unlimited customization, easy to migrate or redesign</p>
          </div>

          <div>
            <h3 className="font-semibold text-green-800 mb-1">Security & Stability</h3>
            <p className="text-green-900">Minimal attack surface, no conflicts, updates wont break your site</p>
          </div>

          <div>
            <h3 className="font-semibold text-green-800 mb-1">Real Cost Savings</h3>
            <p className="text-green-900">No subscriptions, cheaper hosting, lower long-term maintenance costs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;