cube(`LineItems`, {
  sql: `SELECT * FROM public.line_items`,

  // Defining joins if needed to link other tables. For example, joining with `products` might be common.
  joins: {
    Products: {
      sql: `${CUBE}.product_id = ${Products}.id`,
      relationship: `belongsTo`
    },
    Orders: {
      sql: `${CUBE}.order_id = ${Orders}.id`,
      relationship: `belongsTo`
    }
  },

  // Measures are calculations you can aggregate
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, createdAt]
    },
    totalRevenue: {
      sql: `${price} * ${quantity}`,
      type: `sum`,
      title: `Total Revenue`
    },
    averagePrice: {
      sql: `${price}`,
      type: `avg`,
      title: `Average Price`
    }
  },

  // Dimensions are attributes about the data you might want to group by
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    productId: {
      sql: `product_id`,
      type: `number`
    },
    orderId: {
      sql: `order_id`,
      type: `number`
    },
    quantity: {
      sql: `quantity`,
      type: `number`
    },
    price: {
      sql: `price`,
      type: `number`
    }
  },

  // Optional segments for filtering, e.g., items created after a certain date
  segments: {
    recent: {
      sql: `${CUBE}.created_at > ${FILTER_PARAMS.LineItems.createdAt.recent.filter((from, to) => `created_at >= ${from} AND created_at <= ${to}`)}`
    }
  }
});
