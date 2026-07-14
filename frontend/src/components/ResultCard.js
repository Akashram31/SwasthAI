import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


const riskBannerClasses = {
  Low: "alert alert-success text-center",
  Moderate: "alert alert-warning text-center",
  High: "alert alert-danger text-center",
};


function ResultCard({ assessment }) {

  const bannerClass =
    riskBannerClasses[assessment?.riskLevel] ||
    riskBannerClasses.High;


  // ======================================================
  // USER-FRIENDLY SHAP FEATURE NAMES
  // ======================================================

  const featureNames = {

    BMI: "BMI",

    HighBP: "High Blood Pressure",

    HighChol: "High Cholesterol",

    Smoker: "Smoking",

    HvyAlcoholConsump: "Heavy Alcohol Consumption",

    PhysActivity: "Physical Activity",

    Fruits: "Fruit Intake",

    Veggies: "Vegetable Intake",

    GenHlth: "General Health",

    DiffWalk: "Difficulty Walking",

    Age: "Age",

    Sex: "Gender",

  };


  // ======================================================
  // PREPARE SHAP DATA
  // ======================================================

  const shapData = (assessment?.shapFactors || []).map(
    (item) => ({

      name:
        featureNames[item.feature] ||
        item.feature,

      impact: Math.abs(item.contribution),

    })
  );


  // ======================================================
  // RECOMMENDATIONS
  // ======================================================

  const recommendations =
    assessment?.recommendations || [];


  // ======================================================
  // YES / NO / N/A HELPER
  // Safely handles old assessments that may not contain
  // HighBP or HighChol.
  // ======================================================

  const formatYesNo = (value) => {

    if (
      value === undefined ||
      value === null
    ) {
      return "N/A";
    }

    if (
      value === 1 ||
      value === true
    ) {
      return "Yes";
    }

    if (
      value === 0 ||
      value === false
    ) {
      return "No";
    }

    return "N/A";
  };


  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-lg-10">

          <div className="card shadow-sm border">

            <div className="card-body p-4">


              {/* ==================================================
                  RISK BANNER
              ================================================== */}

              <div className={bannerClass}>

                <h2>

                  Diabetes Risk Level :

                  <strong>
                    {" "}
                    {assessment?.riskLevel || "N/A"}
                  </strong>

                </h2>


                <h4 className="mt-3">

                  Risk Probability :

                  <strong>
                    {" "}
                    {assessment?.riskProbability ?? 0}%
                  </strong>

                </h4>

              </div>


              <div className="row mt-4">


                {/* ==================================================
                    HEALTH SUMMARY
                ================================================== */}

                <div className="col-md-6 mb-4">

                  <div className="card h-100">

                    <div className="card-body">

                      <h5 className="card-title mb-3">

                        📋 Your Health Summary

                      </h5>


                      <table className="table">

                        <tbody>


                          {/* AGE */}

                          <tr>

                            <th>Age</th>

                            <td>

                              {assessment?.age ?? "N/A"}

                              {assessment?.age !== undefined &&
                              assessment?.age !== null
                                ? " years"
                                : ""}

                            </td>

                          </tr>


                          {/* GENDER */}

                          <tr>

                            <th>Gender</th>

                            <td>
                              {assessment?.gender ?? "N/A"}
                            </td>

                          </tr>


                          {/* HEIGHT */}

                          <tr>

                            <th>Height</th>

                            <td>

                              {assessment?.height ?? "N/A"}

                              {assessment?.height !== undefined &&
                              assessment?.height !== null
                                ? " cm"
                                : ""}

                            </td>

                          </tr>


                          {/* WEIGHT */}

                          <tr>

                            <th>Weight</th>

                            <td>

                              {assessment?.weight ?? "N/A"}

                              {assessment?.weight !== undefined &&
                              assessment?.weight !== null
                                ? " kg"
                                : ""}

                            </td>

                          </tr>


                          {/* BMI */}

                          <tr>

                            <th>BMI</th>

                            <td>
                              {assessment?.bmi ?? "N/A"}
                            </td>

                          </tr>


                          {/* HIGH BLOOD PRESSURE */}

                          <tr>

                            <th>High Blood Pressure</th>

                            <td>
                              {formatYesNo(
                                assessment?.highBP
                              )}
                            </td>

                          </tr>


                          {/* HIGH CHOLESTEROL */}

                          <tr>

                            <th>High Cholesterol</th>

                            <td>
                              {formatYesNo(
                                assessment?.highChol
                              )}
                            </td>

                          </tr>


                          {/* SMOKING */}

                          <tr>

                            <th>Smoking</th>

                            <td>
                              {formatYesNo(
                                assessment?.smoking
                              )}
                            </td>

                          </tr>


                          {/* ALCOHOL */}

                          <tr>

                            <th>Heavy Alcohol Consumption</th>

                            <td>
                              {formatYesNo(
                                assessment?.alcohol
                              )}
                            </td>

                          </tr>


                          {/* PHYSICAL ACTIVITY */}

                          <tr>

                            <th>Physical Activity</th>

                            <td>
                              {formatYesNo(
                                assessment?.physicalActivity
                              )}
                            </td>

                          </tr>


                        </tbody>

                      </table>

                    </div>

                  </div>

                </div>


                {/* ==================================================
                    SHAP CHART
                ================================================== */}

                <div className="col-md-6 mb-4">

                  <div className="card h-100">

                    <div className="card-body">

                      <h5 className="card-title">

                        🔍 Key Factors Affecting Your Risk (SHAP)

                      </h5>


                      <p className="text-muted">

                        This chart shows which factors contributed
                        most to your diabetes risk prediction.

                      </p>


                      {shapData.length > 0 ? (

                        <ResponsiveContainer
                          width="100%"
                          height={280}
                        >

                          <BarChart data={shapData}>

                            <CartesianGrid
                              strokeDasharray="3 3"
                            />


                            <XAxis

                              dataKey="name"

                              tick={{
                                fontSize: 11
                              }}

                              angle={-30}

                              textAnchor="end"

                              height={80}

                            />


                            <YAxis />


                            <Tooltip />


                            <Bar

                              dataKey="impact"

                              fill="#0d6efd"

                              name="Impact Score"

                            />

                          </BarChart>

                        </ResponsiveContainer>

                      ) : (

                        <p className="text-center text-muted py-5">

                          SHAP explanation not available.

                        </p>

                      )}

                    </div>

                  </div>

                </div>

              </div>


              {/* ==================================================
                  RECOMMENDATIONS
              ================================================== */}

              <div className="card mt-3">

                <div className="card-body">

                  <h5 className="card-title">

                    💡 Personalized Recommendations

                  </h5>


                  {recommendations.length > 0 ? (

                    recommendations.map(
                      (rec, index) => (

                        <div

                          key={index}

                          className="alert alert-info py-2"

                        >

                          ✅ {rec}

                        </div>

                      )
                    )

                  ) : (

                    <p className="text-muted">

                      No recommendations available.

                    </p>

                  )}

                </div>

              </div>


              {/* ==================================================
                  MEDICAL DISCLAIMER
              ================================================== */}

              <p className="text-center text-muted mt-4 mb-0">

                ⚠️ Note: SwasthAI provides risk assessment only,
                not medical diagnosis. Always consult a healthcare
                professional for medical advice.

              </p>


            </div>

          </div>

        </div>

      </div>

    </div>

  );

}


export default ResultCard;