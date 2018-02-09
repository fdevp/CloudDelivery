using CloudDelivery.Providers;
using Moq;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudDelivery.Extensions;
using Newtonsoft.Json;
using CloudDelivery.Models.GoogleApis;

namespace CloudDelivery.Tests.Mocks
{
    public class HttpProviderMocks
    {
        private static readonly string gmapsKey = System.Configuration.ConfigurationManager.AppSettings["GoogleMapsApiKey"];
        private static readonly string distanceMatrixUri = System.Configuration.ConfigurationManager.AppSettings["DistanceMatrixUri"];
        private static readonly string directionsUri = System.Configuration.ConfigurationManager.AppSettings["DirectionsUri"];
        private static readonly string geocodeUri = System.Configuration.ConfigurationManager.AppSettings["GeocodeUri"];


        public static Mock<IHttpProvider> GMapsHttpProviderMock()
        {
            var httpClientMock = new Mock<IHttpProvider>();

            //set methods mocks
            Geocoder(httpClientMock);
            DistanceMatrixOriginDest(httpClientMock);
            DistanceMatrixWithWaypoint(httpClientMock);
            DirectionsOriginDest(httpClientMock);
            DirectionsWithWaypoint(httpClientMock);

            return httpClientMock;
        }

        private static void Geocoder(Mock<IHttpProvider> mock)
        {
            Dictionary<string, string> parametersGeocoder = new Dictionary<string, string>();
            parametersGeocoder.Add("key", gmapsKey);
            parametersGeocoder.Add("address", "Blanes+Spain");
            string responseGeocoder = "{ 'results' : [ { 'address_components' : [ { 'long_name' : 'Blanes', 'short_name' : 'Blanes', 'types' : [ 'locality', 'political' ] }, { 'long_name' : 'Girona', 'short_name' : 'Girona', 'types' : [ 'administrative_area_level_2', 'political' ] }, { 'long_name' : 'Catalunya', 'short_name' : 'CT', 'types' : [ 'administrative_area_level_1', 'political' ] }, { 'long_name' : 'Hiszpania', 'short_name' : 'ES', 'types' : [ 'country', 'political' ] }, { 'long_name' : '17300', 'short_name' : '17300', 'types' : [ 'postal_code' ] } ], 'formatted_address' : '17300 Blanes, Girona, Hiszpania', 'geometry' : { 'bounds' : { 'northeast' : { 'lat' : 41.6877822, 'lng' : 2.8024599 }, 'southwest' : { 'lat' : 41.6511206, 'lng' : 2.7646659 } }, 'location' : { 'lat' : 41.6759954, 'lng' : 2.7902289 }, 'location_type' : 'APPROXIMATE', 'viewport' : { 'northeast' : { 'lat' : 41.6877822, 'lng' : 2.8024599 }, 'southwest' : { 'lat' : 41.6511206, 'lng' : 2.7646659 } } }, 'place_id' : 'ChIJQ40kOPM9uxIRgolj8LA4DtA', 'types' : [ 'locality', 'political' ] } ], 'status' : 'OK' }";
            mock.Setup(
                x => x.GetAsync<GeocodeRoot>(
                            It.Is<string>(r => r == geocodeUri),
                            It.Is<Dictionary<string, string>>(p => p.CompareTo<string, string>(parametersGeocoder))
                    ))
                .Returns(Task.FromResult<GeocodeRoot>(JsonConvert.DeserializeObject<GeocodeRoot>(responseGeocoder)));
        }

        private static void DistanceMatrixOriginDest(Mock<IHttpProvider> mock)
        {
            Dictionary<string, string> parametersSingleDma = new Dictionary<string, string>();
            parametersSingleDma.Add("key", gmapsKey);
            parametersSingleDma.Add("origins", "Washington,DC");
            parametersSingleDma.Add("destinations", "New+York+City,NY");

            string responseSingleDma = @"{ 'destination_addresses' : [ 'New York, NY, USA' ], 'origin_addresses' : [ 'Washington, DC, USA' ], 'rows' : [ { 'elements' : [ { 'distance' : { 'text' : '225 mi', 'value' : 361715 }, 'duration' : { 'text' : '3 hours 49 mins', 'value' : 13725 }, 'status' : 'OK' } ] } ], 'status' : 'OK' }";
            mock.Setup(
                x => x.GetAsync<DistanceMatrixRoot>(
                        It.Is<string>(r => r == distanceMatrixUri),
                        It.Is<Dictionary<string, string>>(p => p.CompareTo<string, string>(parametersSingleDma))
                    ))
                .Returns(Task.FromResult<DistanceMatrixRoot>(JsonConvert.DeserializeObject<DistanceMatrixRoot>(responseSingleDma)));
        }

        private static void DistanceMatrixWithWaypoint(Mock<IHttpProvider> mock)
        {
            Dictionary<string, string> parametersMultipleDma = new Dictionary<string, string>();
            parametersMultipleDma.Add("key", gmapsKey);
            parametersMultipleDma.Add("origins", "52.406563,16.925853|51.766664,19.478922");
            parametersMultipleDma.Add("destinations", "51.766664,19.478922|52.227799,20.985093");

            string responseMultipleDma = @"{ 'destination_addresses' : [ 'Przędzalniana 3, 90-034 Łódź, Polska', 'Towarowa 7A, Warszawa, Polska' ], 'origin_addresses' : [ 'Piekary 25, 61-823 Poznań, Polska', 'Wysoka 7-9, 90-023 Łódź, Polska' ], 'rows' : [ { 'elements' : [ { 'distance' : { 'text' : '216 km', 'value' : 216020 }, 'duration' : { 'text' : '2 godz. 18 min', 'value' : 8296 }, 'status' : 'OK' }, { 'distance' : { 'text' : '310 km', 'value' : 310440 }, 'duration' : { 'text' : '3 godz. 1 min', 'value' : 10840 }, 'status' : 'OK' } ] }, { 'elements' : [ { 'distance' : { 'text' : '1 m', 'value' : 0 }, 'duration' : { 'text' : '1 min', 'value' : 0 }, 'status' : 'OK' }, { 'distance' : { 'text' : '128 km', 'value' : 127627 }, 'duration' : { 'text' : '1 godz. 27 min', 'value' : 5228 }, 'status' : 'OK' } ] } ], 'status' : 'OK' }";
            mock.Setup(
               x => x.GetAsync<DistanceMatrixRoot>(
                        It.Is<string>(r => r == distanceMatrixUri),
                        It.Is<Dictionary<string, string>>(p => p.CompareTo<string, string>(parametersMultipleDma))
                   ))
               .Returns(Task.FromResult<DistanceMatrixRoot>(JsonConvert.DeserializeObject<DistanceMatrixRoot>(responseMultipleDma)));
        }

        private static void DirectionsOriginDest(Mock<IHttpProvider> mock)
        {
            Dictionary<string, string> parametersSingleDirections = new Dictionary<string, string>();
            parametersSingleDirections.Add("key", gmapsKey);
            parametersSingleDirections.Add("origin", "Disneyland");
            parametersSingleDirections.Add("destination", "Universal+Studios+Hollywood4");

            string responseSingleDirections = @"{ 'geocoded_waypoints' : [ { 'geocoder_status' : 'OK', 'place_id' : 'ChIJa147K9HX3IAR-lwiGIQv9i4', 'types' : [ 'amusement_park', 'establishment', 'point_of_interest' ] }, { 'geocoder_status' : 'OK', 'partial_match' : true, 'place_id' : 'ChIJzzgyJU--woARcZqceSdQ3dM', 'types' : [ 'amusement_park', 'establishment', 'point_of_interest' ] } ], 'routes' : [ { 'bounds' : { 'northeast' : { 'lat' : 34.1373841, 'lng' : -117.9220826 }, 'southwest' : { 'lat' : 33.8151707, 'lng' : -118.3575557 } }, 'copyrights' : 'Dane do Mapy ©2018 Google', 'legs' : [ { 'distance' : { 'text' : '36,0 mil', 'value' : 57964 }, 'duration' : { 'text' : '49 min', 'value' : 2952 }, 'end_address' : '100 Universal City Plaza, Universal City, CA 91608, Stany Zjednoczone', 'end_location' : { 'lat' : 34.1364887, 'lng' : -118.3569926 }, 'start_address' : '1313 Disneyland Dr, Anaheim, CA 92802, Stany Zjednoczone', 'start_location' : { 'lat' : 33.8162219, 'lng' : -117.9224731 }, 'steps' : [ { 'distance' : { 'text' : '59 stóp', 'value' : 18 }, 'duration' : { 'text' : '1 min', 'value' : 2 }, 'end_location' : { 'lat' : 33.8160679, 'lng' : -117.9225314 }, 'html_instructions' : 'Kieruj się na \u003cb\u003epołudnie\u003c/b\u003e', 'polyline' : { 'points' : 'kvkmElvvnU\\J' }, 'start_location' : { 'lat' : 33.8162219, 'lng' : -117.9224731 }, 'travel_mode' : 'DRIVING' }, { 'distance' : { 'text' : '0,4 mil', 'value' : 569 }, 'duration' : { 'text' : '2 min', 'value' : 112 }, 'end_location' : { 'lat' : 33.8151707, 'lng' : -117.9280369 }, 'html_instructions' : 'Trzymaj się \u003cb\u003elewej\u003c/b\u003e strony', 'maneuver' : 'keep-left', 'polyline' : { 'points' : 'mukmExvvnUH@H@JDJHNJJJPTN\\Lb@B`@?h@@v@DdYZ?R?' }, 'start_location' : { 'lat' : 33.8160679, 'lng' : -117.9225314 }, 'travel_mode' : 'DRIVING' } ], 'traffic_speed_entry' : [], 'via_waypoint' : [] } ], 'overview_polyline' : { 'points' : 'kvkmElvvnU|@Tx@v@\\`ABjAF|Zn@?Cc\\q@{Aw@}@y@c@kBg@aD]}AD}@JeH`BuEvAcB]yDoAeAOkBNo@V{BfBcK|I}@nAeCtBuFxFmIdJmOjPaChDeBlDiAdD}ApGcDxU}@hEmAxD}[tt@yNb\\yBdEqFnJqB~DeFxM{Yrs@uKzVoCxEsEtG}BzCkHhKWh@]t@{AxEcClLuDlPwBfHaEzJoInOaBnCiF|K_Oz\\{MdZwAbDaKbUiB|CgCnDkDbEiE|FqBlDsLdXqQra@kX|m@aF|KcHtLm@pAaE~JcTxh@}Np\\kK~SmBlEiGnLkKdUoDzIqDtH_FtIoDlFsCtDgDvDcGdG}BtBgDrE}ArCqBtAeDvBeFrGgCtEeElJiClFkDpFmEpGuBhCcCjCqCzBkC~AgKrG}t@`e@}g@x[y^nT_ShLeK|FiWdOoKjGaEzCoEzEwDxFsUh^q_@`l@uBnCgCbCoFlDmDvAiCr@eRzDuNxC_EvAiFpCaC|AqGpEwHzFoQnQoTrTqBlCyDnGmCfEmDpDyGzGsIzHuZzYkGrFeFpCqCxAoBrAqDdDcNfMgHbHcPxR}@xAeE|HoDrEiJlIqClDcAdB_CfGoLv\\}AdFuAnHo@rCcAjCsBbE}@nBcMp^wAdE}@hD_AzF[fDMpD?|]AtTOdEu@nG}@nEgXpy@oBzGW~@@f@CNcBvGeMx^mGzQgCrGiA~BkE~G{@bAeBvA{AzA}CtByAn@qCr@oCVkB?cD]iDO{CLsCJ}BIoBWgFq@{DWcLBiGTqDb@cCf@cDbAsEnBeC`AwEpBoBfBw@rAs@pBUjBOzC}@vIgB~Sk@lJa@tGAbCJdF[vD_@xAoA|CgIjOiHzMwFxImDlEoCfCcKjIgFlEaE|F_JbNmDhGkBrEcB|FkDhNgGjVeIjVgEzMuBnGgBlE}CxJeF~VgCxMiD`VgBvM_AjIcA~FkBzGaIhReKbYsC~FqPtXyDlFgDxCoDbCsPxIgCpBwBdC_GlKaEjHuBzC{AdBqCdCkDzBgQtIsDlB_ClBgBrBeC`FyApGYhDOpLg@xFg@zBeBtEaGfLqPl\\aBfCkBzBoBzA_DbB}F|A_SfE{Ex@_Dz@{F~ByCfBeE|C_D~CmNfQcCbCkFdD{DrCoGrGkDdDM?iC|B{AnA]NaHjEo@p@sAtBu@hAmAbAYb@a@lAa@xAHzALnBiAnIgC~K]Im@AyBd@kBn@a@^g@@i@ESk@YqAj@CBCfATx@B' }, 'summary' : 'I-5 N i US-101 N', 'warnings' : [], 'waypoint_order' : [] } ], 'status' : 'OK' }";
            mock.Setup(
               x => x.GetAsync<string>(
                        It.Is<string>(r => r == directionsUri),
                        It.Is<Dictionary<string, string>>(p => p.CompareTo<string, string>(parametersSingleDirections))
                   ))
               .Returns(Task.FromResult<string>(responseSingleDirections));
        }

        private static void DirectionsWithWaypoint(Mock<IHttpProvider> mock)
        {
            Dictionary<string, string> parametersMultiDirections = new Dictionary<string, string>();
            parametersMultiDirections.Add("key", gmapsKey);
            parametersMultiDirections.Add("origin", "52.406563,16.925853");
            parametersMultiDirections.Add("destination", "51.766664,19.478922");
            parametersMultiDirections.Add("waypoints", "52.227799,20.985093");

            string responseMultiDirections = @"{ 'geocoded_waypoints' : [ { 'geocoder_status' : 'OK', 'place_id' : 'EiJQaWVrYXJ5IDI1LCA2MS04MjMgUG96bmHFhCwgUG9sc2th', 'types' : [ 'street_address' ] }, { 'geocoder_status' : 'OK', 'place_id' : 'ChIJTYdYRZrMHkcRT2EF6c6KbaY', 'types' : [ 'street_address' ] }, { 'geocoder_status' : 'OK', 'place_id' : 'ChIJ76ZCezHLG0cRM_L1kDfcvck', 'types' : [ 'street_address' ] } ], 'routes' : [ { 'bounds' : { 'northeast' : { 'lat' : 52.4060478, 'lng' : 20.9885927 }, 'southwest' : { 'lat' : 51.7667596, 'lng' : 16.9220459 } }, 'copyrights' : 'Dane do Mapy ©2018 Google', 'legs' : [ { 'distance' : { 'text' : '310 km', 'value' : 310440 }, 'duration' : { 'text' : '3 godz. 1 min', 'value' : 10841 }, 'end_address' : 'Towarowa 7A, Warszawa, Polska', 'end_location' : { 'lat' : 52.22808999999999, 'lng' : 20.9849365 }, 'start_address' : 'Piekary 25, 61-823 Poznań, Polska', 'start_location' : { 'lat' : 52.4060478, 'lng' : 16.9272175 }, 'steps' : [ { 'distance' : { 'text' : '0,3 km', 'value' : 273 }, 'duration' : { 'text' : '1 min', 'value' : 82 }, 'end_location' : { 'lat' : 52.40568099999999, 'lng' : 16.9311547 }, 'html_instructions' : 'Kieruj się \u003cb\u003eŚwięty Marcin\u003c/b\u003e na \u003cb\u003ewschód\u003c/b\u003e w stronę \u003cb\u003eAleje Marcinkowskiego\u003c/b\u003e', 'polyline' : { 'points' : 'ypz~HcbifBRcET_HBm@NaF?K@C?E@A?A@A@?@A@?' }, 'start_location' : { 'lat' : 52.4060478, 'lng' : 16.9272175 }, 'travel_mode' : 'DRIVING' }, { 'distance' : { 'text' : '0,3 km', 'value' : 277 }, 'duration' : { 'text' : '1 min', 'value' : 82 }, 'end_location' : { 'lat' : 52.403697, 'lng' : 16.9288582 }, 'html_instructions' : '\u003cb\u003eŚwięty Marcin\u003c/b\u003e skręca \u003cb\u003ew prawo\u003c/b\u003e i przechodzi w \u003cb\u003eKrysiewicza\u003c/b\u003e', 'polyline' : { 'points' : 'onz~HuzifBp@F\\FFDFDHJ`CxD~CfF' }, 'start_location' : { 'lat' : 52.40568099999999, 'lng' : 16.9311547 }, 'travel_mode' : 'DRIVING' } ], 'traffic_speed_entry' : [], 'via_waypoint' : [] }, { 'distance' : { 'text' : '126 km', 'value' : 125808 }, 'duration' : { 'text' : '1 godz. 27 min', 'value' : 5208 }, 'end_address' : 'Przędzalniana 3, 90-034 Łódź, Polska', 'end_location' : { 'lat' : 51.7667596, 'lng' : 19.4799855 }, 'start_address' : 'Towarowa 7A, Warszawa, Polska', 'start_location' : { 'lat' : 52.22808999999999, 'lng' : 20.9849365 }, 'steps' : [ { 'distance' : { 'text' : '71 m', 'value' : 71 }, 'duration' : { 'text' : '1 min', 'value' : 20 }, 'end_location' : { 'lat' : 52.22832349999999, 'lng' : 20.9859064 }, 'html_instructions' : 'Kieruj się na \u003cb\u003ewschód\u003c/b\u003e w stronę \u003cb\u003eTowarowa\u003c/b\u003e/\u003cb\u003eDW634\u003c/b\u003e', 'polyline' : { 'points' : 'qxw}H{ra_CUgBCWEUMk@' }, 'start_location' : { 'lat' : 52.22808999999999, 'lng' : 20.9849365 }, 'travel_mode' : 'DRIVING' }, { 'distance' : { 'text' : '0,4 km', 'value' : 415 }, 'duration' : { 'text' : '2 min', 'value' : 124 }, 'end_location' : { 'lat' : 52.2249949, 'lng' : 20.9886034 }, 'html_instructions' : 'Skręć \u003cb\u003ew prawo\u003c/b\u003e w \u003cb\u003eTowarowa\u003c/b\u003e/\u003cb\u003eDW634\u003c/b\u003e', 'maneuver' : 'turn-right', 'polyline' : { 'points' : '_zw}H}xa_CtAkAbAw@PQJINQHOHMFKHIJIRQRMLKDCHCNGNGFCFC^Sn@i@tB}Ab@[^YBADABABADAFA' }, 'start_location' : { 'lat' : 52.22832349999999, 'lng' : 20.9859064 }, 'travel_mode' : 'DRIVING' } ], 'traffic_speed_entry' : [], 'via_waypoint' : [] } ], 'overview_polyline' : { 'points' : 'ypz~HcbifB`D{VrI~OxA`\\fA~AANHVb@d@tEtCbFkPbKcyAlV{wAlX{cAr`@ai@n~AarBpmBql@xm@kHiEzEpD}fAzd@oaFdmAczIdxA}~Gp[_yC}Dk`DkJ{`Gr@ggKT{wHuLscEkYgyCePg~EnAyhD|GyvHf[shDtRiuDrO_hCpa@guCnbAsuGndB{eGpg@akCn\\kpEjm@ybHdeAmbI~pAurGp~@{{G|eAg_H`l@k}Dhj@}eCxTqlB`h@ulCx[ilCzeA}kInYopCxQ_bCzYs~GrZmdBn[}rBpR}pCv[gdC|C_nDsKw~DwUqjD}e@seFDyuAbL{aBjn@s`FhGskCgCguFtJqiCla@c}C`iA{rHxl@awGddBihFzn@ciBpxA}vBduAk`D|hCupEto@}uB~e@{lDjt@qnD`x@axE~ZipAha@{cCpSkoCnXopBfk@mdB~jAemC`i@yaCvh@unBln@}nD|h@ufCx^epCxOsyHvw@gnI|JkaCr_@k`FrKw`HhXkpB|f@gkBho@scCxToaDkAmpDjMssC`f@svElEgzAsHk}CeOypEmRosBaHyhDuRmdC{i@giCooBctG}`AanD{yAsvD_t@cz@o_BgbD}{AgvCmmAoaGm{@k~BcaAiuDy}Ay{Eyq@afE}bAcgNmdBiuL_PcdElN}tHkBacC}L_aB}b@_cCiZkaA}b@g{Aaf@soEgxAc_Ls~@apHe}@cnEe{AwqLwn@qvJuu@whH}t@q~Ckr@qeB}`@cWoUih@kLiqAiH}zAkKwjAu]a}AnAmfAxbAajB~~@e}ChVihBlOmXuFcVce@vA_~@_VibBarCc{@ozAkHcZwHvBar@~MuLkE_Cm_AiG_xArRoW`J{FvKth@v`@tjBxl@f}A|aAfcB`k@vaA|Ux]fQtEjq@rR~PfYo@dVgKf}@uO|{@}c@|yA_Zd~@m`@pn@}[vu@jNn|AjZhbBzDvmArGh|@rU~|Ax~@v|@zm@rqBno@~gDr`AxaKtf@t~HjgAdaIjv@z|Dh_AjwGzk@xqEzs@~qFv\\l}D`n@|iCnd@x|A~d@hdDfH``D_HjuCkElpEba@f|Fvy@niFpw@poHx^tjGb^luCn`@vhBxyAfqEvh@r~Blb@~aAze@fsAtoAdiGdw@rdB|mB~uDdmAt~Ab~BflGz{@rvDfoBfpGfZlhCnJr`Ev]duFdOvkFwDda@jj@t]bu@~i@thBfcA~wAde@tNdTnbA`yClcAvyC`bAz[p^pm@hYle@~l@Kz_@`Zxh@dLlNjPz~@yH' }, 'summary' : 'A2', 'warnings' : [], 'waypoint_order' : [ 0 ] } ], 'status' : 'OK' }";

            mock.Setup(
              x => x.GetAsync<string>(
                        It.Is<string>(r => r == directionsUri),
                        It.Is<Dictionary<string, string>>(p => p.CompareTo<string, string>(parametersMultiDirections))
                  ))
              .Returns(Task.FromResult<string>(responseMultiDirections));

        }
    }
}
